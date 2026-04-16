import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { VenueCard } from "@/components/VenueCard";
import { getVenuesByCategory } from "@/data/venues";
import { useColors } from "@/hooks/useColors";

const SAFETY_TIPS = [
  { icon: "shield", text: "Безопасная среда" },
  { icon: "users", text: "Малые группы" },
  { icon: "smile", text: "Игровой формат" },
  { icon: "check-circle", text: "Опытные тренеры" },
];

export default function KidsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const venues = getVenuesByCategory("kids");

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.kids.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 84,
      }}
    >
      {/* Kids Hero */}
      <View
        style={[
          styles.kidsHero,
          {
            backgroundColor: colors.kids.primary,
            paddingTop: Platform.OS === "web" ? 67 + 12 : insets.top + 12,
          },
        ]}
      >
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
          style={styles.backBtn}
          hitSlop={8}
        >
          <Feather name="chevron-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.kidsEmoji}>⭐</Text>
        <Text style={styles.kidsHeroTitle}>Детский спорт</Text>
        <Text style={styles.kidsHeroSubtitle}>
          Безопасные занятия для малышей в игровой и весёлой форме
        </Text>
      </View>

      {/* Safety badges */}
      <View style={[styles.safetyCard, { backgroundColor: colors.card, borderColor: colors.kids.primary + "30" }]}>
        <Text style={[styles.safetyTitle, { color: colors.kids.primary }]}>
          Наши гарантии родителям
        </Text>
        <View style={styles.safetygrid}>
          {SAFETY_TIPS.map((tip) => (
            <View key={tip.icon} style={styles.safetyItem}>
              <View style={[styles.safetyIcon, { backgroundColor: colors.kids.primary + "20" }]}>
                <Feather name={tip.icon as any} size={18} color={colors.kids.primary} />
              </View>
              <Text style={[styles.safetyText, { color: colors.foreground }]}>{tip.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Kids venues */}
      <View style={styles.venuesSection}>
        <Text style={[styles.venuesTitle, { color: colors.foreground }]}>
          Секции для детей ({venues.length})
        </Text>
        {venues.map((v) => (
          <VenueCard key={v.id} venue={v} isKids />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  kidsHero: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: "center",
    gap: 8,
  },
  backBtn: {
    alignSelf: "flex-start",
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  kidsEmoji: {
    fontSize: 48,
  },
  kidsHeroTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
  },
  kidsHeroSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  safetyCard: {
    margin: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 18,
    gap: 12,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  safetygrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  safetyItem: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  safetyIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  safetyText: {
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  venuesSection: {
    padding: 16,
    gap: 4,
  },
  venuesTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
});
