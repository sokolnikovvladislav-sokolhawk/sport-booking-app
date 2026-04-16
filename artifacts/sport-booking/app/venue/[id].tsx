import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BookingCalendar } from "@/components/BookingCalendar";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ReviewCard } from "@/components/ReviewCard";
import { TrainerCard } from "@/components/TrainerCard";
import type { TimeSlot, Trainer } from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import { getVenueById } from "@/data/venues";
import { useColors } from "@/hooks/useColors";

export default function VenueDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite, addBooking } = useApp();

  const venue = getVenueById(id);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTab, setActiveTab] = useState<"about" | "trainers" | "reviews">("about");

  if (!venue) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.foreground }]}>Место не найдено</Text>
      </View>
    );
  }

  const isKids = venue.category === "kids";
  const accentColor = isKids ? colors.kids.primary : colors.primary;
  const favorite = isFavorite(venue.id);

  const handleBookingConfirm = (date: string, slot: TimeSlot) => {
    setShowCalendar(false);
    addBooking({
      venueId: venue.id,
      venueName: venue.name,
      venueImage: venue.image,
      trainerId: selectedTrainer?.id,
      trainerName: selectedTrainer?.name,
      date,
      time: slot.time,
      category: venue.category,
      status: "confirmed",
      price: selectedTrainer?.price ?? venue.price,
    });
    Alert.alert("Бронирование подтверждено!", `${venue.name}\n${date} в ${slot.time}`, [
      { text: "Мои бронирования", onPress: () => router.push("/(tabs)/bookings") },
      { text: "OK" },
    ]);
  };

  const tabs = [
    { key: "about", label: "О месте" },
    { key: "trainers", label: "Тренеры" },
    { key: "reviews", label: "Отзывы" },
  ] as const;

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: venue.image }} style={styles.heroImage} />
          <View
            style={[
              styles.heroOverlay,
              {
                top: Platform.OS === "web"
                  ? 67 + 10
                  : insets.top + 10,
              },
            ]}
          >
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.back();
              }}
              style={[styles.iconBtn, { backgroundColor: "rgba(255,255,255,0.95)" }]}
            >
              <Feather name="chevron-left" size={22} color={colors.foreground} />
            </Pressable>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                toggleFavorite(venue.id);
              }}
              style={[styles.iconBtn, { backgroundColor: "rgba(255,255,255,0.95)" }]}
            >
              <Feather name="heart" size={20} color={favorite ? "#ff3b5c" : "#999"} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.content, { paddingBottom: 120 + insets.bottom }]}>
          {/* Title */}
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <Text style={[styles.name, { color: colors.foreground }]}>{venue.name}</Text>
              <View style={styles.ratingBadge}>
                <Feather name="star" size={14} color="#f59e0b" />
                <Text style={styles.ratingNum}>{venue.rating.toFixed(1)}</Text>
              </View>
            </View>
            <View style={styles.addressRow}>
              <Feather name="map-pin" size={13} color={colors.mutedForeground} />
              <Text style={[styles.address, { color: colors.mutedForeground }]}>{venue.address}</Text>
            </View>
            <View style={styles.tagsRow}>
              {venue.tags.map((tag) => (
                <View key={tag} style={[styles.tag, { backgroundColor: accentColor + "18" }]}>
                  <Text style={[styles.tagText, { color: accentColor }]}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tabs */}
          <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
            {tabs.map((tab) => (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[
                  styles.tab,
                  activeTab === tab.key && { borderBottomColor: accentColor, borderBottomWidth: 2 },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: activeTab === tab.key ? accentColor : colors.mutedForeground },
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {activeTab === "about" && (
            <View style={styles.section}>
              <Text style={[styles.fullDesc, { color: colors.foreground }]}>
                {venue.fullDescription}
              </Text>
              {venue.photos.length > 1 && (
                <>
                  <Text style={[styles.sectionLabel, { color: colors.foreground }]}>Фотографии</Text>
                  <PhotoGallery photos={venue.photos} />
                </>
              )}
            </View>
          )}

          {activeTab === "trainers" && (
            <View style={styles.section}>
              {venue.trainers.length === 0 ? (
                <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                  Тренеры не указаны
                </Text>
              ) : (
                venue.trainers.map((trainer) => (
                  <TrainerCard
                    key={trainer.id}
                    trainer={trainer}
                    onPress={(t) =>
                      setSelectedTrainer((prev) => (prev?.id === t.id ? null : t))
                    }
                    selected={selectedTrainer?.id === trainer.id}
                    isKids={isKids}
                  />
                ))
              )}
            </View>
          )}

          {activeTab === "reviews" && (
            <View style={styles.section}>
              <View style={styles.reviewSummary}>
                <Text style={[styles.bigRating, { color: accentColor }]}>
                  {venue.rating.toFixed(1)}
                </Text>
                <View>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Feather
                        key={s}
                        name="star"
                        size={16}
                        color={s <= Math.round(venue.rating) ? "#f59e0b" : colors.border}
                      />
                    ))}
                  </View>
                  <Text style={[styles.reviewCount, { color: colors.mutedForeground }]}>
                    {venue.reviewCount} отзывов
                  </Text>
                </View>
              </View>
              {venue.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Book button */}
      <View
        style={[
          styles.bookBar,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 16,
          },
        ]}
      >
        <View style={styles.priceBox}>
          <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>Стоимость</Text>
          <Text style={[styles.price, { color: accentColor }]}>
            {selectedTrainer ? selectedTrainer.price : venue.price}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setShowCalendar(true);
          }}
          style={[styles.bookBtn, { backgroundColor: accentColor }]}
        >
          <Feather name="calendar" size={18} color="#fff" />
          <Text style={styles.bookBtnText}>Забронировать</Text>
        </Pressable>
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>Выберите время</Text>
            <Pressable onPress={() => setShowCalendar(false)}>
              <Feather name="x" size={22} color={colors.foreground} />
            </Pressable>
          </View>
          <ScrollView
            style={styles.modalScroll}
            contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 40 }}
          >
            {selectedTrainer && (
              <View style={[styles.selectedTrainerBanner, { backgroundColor: accentColor + "15" }]}>
                <Feather name="user-check" size={16} color={accentColor} />
                <Text style={[styles.selectedTrainerText, { color: accentColor }]}>
                  Тренер: {selectedTrainer.name}
                </Text>
              </View>
            )}
            <BookingCalendar
              venue={venue}
              onConfirm={handleBookingConfirm}
              accentColor={accentColor}
            />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorText: { fontSize: 16 },
  heroContainer: { position: "relative" },
  heroImage: { width: "100%", height: 280, resizeMode: "cover" },
  heroOverlay: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { padding: 20, gap: 0 },
  titleSection: { gap: 8, marginBottom: 16 },
  titleRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  name: { fontSize: 22, fontWeight: "800", flex: 1, marginRight: 12 },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff8e1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ratingNum: { fontSize: 14, fontWeight: "800", color: "#f59e0b" },
  addressRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  address: { fontSize: 13 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  tagText: { fontSize: 12, fontWeight: "600" },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  tabText: { fontSize: 14, fontWeight: "600" },
  section: { gap: 12 },
  fullDesc: { fontSize: 14, lineHeight: 22 },
  sectionLabel: { fontSize: 16, fontWeight: "700", marginTop: 8 },
  emptyText: { textAlign: "center", paddingVertical: 20 },
  reviewSummary: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 12 },
  bigRating: { fontSize: 48, fontWeight: "800" },
  starsRow: { flexDirection: "row", gap: 3 },
  reviewCount: { fontSize: 13, marginTop: 2 },
  bookBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  priceBox: { flex: 1 },
  priceLabel: { fontSize: 11 },
  price: { fontSize: 16, fontWeight: "800" },
  bookBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    flex: 1.5,
    justifyContent: "center",
  },
  bookBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  modalContainer: { flex: 1 },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 24,
    borderBottomWidth: 1,
  },
  modalTitle: { fontSize: 18, fontWeight: "700" },
  modalScroll: { flex: 1 },
  selectedTrainerBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  selectedTrainerText: { fontSize: 14, fontWeight: "600" },
});
