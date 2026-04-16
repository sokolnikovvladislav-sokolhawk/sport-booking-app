import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Booking } from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const CATEGORY_COLORS: Record<string, string> = {
  gyms: "#FF6B35",
  sections: "#3B82F6",
  medical: "#10B981",
  kids: "#FF69B4",
};

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Подтверждено",
  pending: "Ожидание",
  cancelled: "Отменено",
};

const STATUS_COLORS: Record<string, string> = {
  confirmed: "#22c55e",
  pending: "#f59e0b",
  cancelled: "#ef4444",
};

function BookingItem({ booking, onCancel }: { booking: Booking; onCancel: (id: string) => void }) {
  const colors = useColors();
  const accent = CATEGORY_COLORS[booking.category] ?? colors.primary;

  return (
    <Pressable
      onPress={() => router.push(`/venue/${booking.venueId}`)}
      style={[styles.bookingCard, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <Image source={{ uri: booking.venueImage }} style={styles.venueThumb} />
      <View style={styles.bookingInfo}>
        <View style={styles.bookingRow}>
          <Text style={[styles.venueName, { color: colors.foreground }]} numberOfLines={1}>
            {booking.venueName}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[booking.status] + "20" }]}>
            <Text style={[styles.statusText, { color: STATUS_COLORS[booking.status] }]}>
              {STATUS_LABELS[booking.status]}
            </Text>
          </View>
        </View>
        {booking.trainerName && (
          <View style={styles.trainerRow}>
            <Feather name="user" size={12} color={accent} />
            <Text style={[styles.trainerLabel, { color: accent }]}>{booking.trainerName}</Text>
          </View>
        )}
        <View style={styles.dateRow}>
          <Feather name="calendar" size={12} color={colors.mutedForeground} />
          <Text style={[styles.dateText, { color: colors.mutedForeground }]}>{booking.date}</Text>
          <Feather name="clock" size={12} color={colors.mutedForeground} />
          <Text style={[styles.dateText, { color: colors.mutedForeground }]}>{booking.time}</Text>
        </View>
        <View style={styles.bookingFooter}>
          <Text style={[styles.price, { color: accent }]}>{booking.price}</Text>
          {booking.status === "confirmed" && (
            <Pressable
              onPress={() => onCancel(booking.id)}
              style={[styles.cancelBtn, { borderColor: "#ef4444" }]}
            >
              <Text style={styles.cancelText}>Отменить</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default function BookingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { bookings, cancelBooking } = useApp();

  const handleCancel = (id: string) => {
    Alert.alert(
      "Отменить бронирование?",
      "Это действие нельзя отменить.",
      [
        { text: "Назад", style: "cancel" },
        {
          text: "Отменить",
          style: "destructive",
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            cancelBooking(id);
          },
        },
      ]
    );
  };

  const active = bookings.filter((b) => b.status !== "cancelled");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 84,
      }}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
            paddingTop: Platform.OS === "web" ? 67 : insets.top + 8,
          },
        ]}
      >
        <View style={[styles.headerIcon, { backgroundColor: colors.primary + "18" }]}>
          <Feather name="bookmark" size={22} color={colors.primary} />
        </View>
        <View>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Мои бронирования</Text>
          <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
            {bookings.length} всего
          </Text>
        </View>
      </View>

      {bookings.length === 0 ? (
        <View style={styles.empty}>
          <Feather name="calendar" size={48} color={colors.border} />
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Нет бронирований</Text>
          <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>
            Найдите зал или секцию и забронируйте первое занятие
          </Text>
          <Pressable
            onPress={() => router.push("/(tabs)/")}
            style={[styles.exploreBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.exploreBtnText}>Найти занятие</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.content}>
          {active.length > 0 && (
            <View style={styles.group}>
              <Text style={[styles.groupTitle, { color: colors.foreground }]}>
                Активные ({active.length})
              </Text>
              {active.map((b) => (
                <BookingItem key={b.id} booking={b} onCancel={handleCancel} />
              ))}
            </View>
          )}
          {cancelled.length > 0 && (
            <View style={styles.group}>
              <Text style={[styles.groupTitle, { color: colors.mutedForeground }]}>
                Отменённые ({cancelled.length})
              </Text>
              {cancelled.map((b) => (
                <BookingItem key={b.id} booking={b} onCancel={handleCancel} />
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "800" },
  headerSub: { fontSize: 13 },
  empty: {
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: { fontSize: 20, fontWeight: "700" },
  emptyDesc: { fontSize: 14, textAlign: "center", lineHeight: 20 },
  exploreBtn: {
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  exploreBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  content: { padding: 16, gap: 24 },
  group: { gap: 10 },
  groupTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  bookingCard: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  venueThumb: {
    width: 90,
    height: 90,
    resizeMode: "cover",
  },
  bookingInfo: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  bookingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 6,
  },
  venueName: {
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  trainerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trainerLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dateText: {
    fontSize: 12,
  },
  bookingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
  },
  cancelBtn: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cancelText: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "600",
  },
});
