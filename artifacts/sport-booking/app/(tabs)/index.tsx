import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { VenueCard } from "@/components/VenueCard";
import { getVenuesByCategory } from "@/data/venues";
import { useColors } from "@/hooks/useColors";

const SCREEN_W = Dimensions.get("window").width;

const CATEGORIES = [
  {
    key: "gyms",
    label: "Тренажёрные залы",
    icon: "activity",
    color: "#FF6B35",
    route: "/(tabs)/gyms",
    emoji: "🏋️",
    desc: "Силовые и кардио",
  },
  {
    key: "sections",
    label: "Спортивные секции",
    icon: "award",
    color: "#3B82F6",
    route: "/(tabs)/sections",
    emoji: "⚽",
    desc: "Теннис, бокс, йога",
  },
  {
    key: "medical",
    label: "Спортивная медицина",
    icon: "heart",
    color: "#10B981",
    route: "/(tabs)/medical",
    emoji: "🩺",
    desc: "Массаж, реабилитация",
  },
  {
    key: "kids",
    label: "Детский спорт",
    icon: "star",
    color: "#FF69B4",
    route: "/(tabs)/kids",
    emoji: "🌟",
    desc: "Для малышей и детей",
  },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const featuredGyms = getVenuesByCategory("gyms").slice(0, 2);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 84,
      }}
    >
      {/* Hero header */}
      <View
        style={[
          styles.hero,
          {
            backgroundColor: colors.primary,
            paddingTop: Platform.OS === "web" ? 67 + 12 : insets.top + 20,
          },
        ]}
      >
        <Text style={styles.heroGreeting}>Добро пожаловать</Text>
        <Text style={styles.heroTitle}>SportBook</Text>
        <Text style={styles.heroSubtitle}>Найди и забронируй своё занятие</Text>

        <Pressable style={styles.searchBar} onPress={() => {}}>
          <Feather name="search" size={16} color="#999" />
          <Text style={styles.searchPlaceholder}>Поиск залов, секций...</Text>
        </Pressable>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Разделы</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.key}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push(cat.route as any);
              }}
              style={({ pressed }) => [
                styles.catCard,
                {
                  backgroundColor: cat.color + "15",
                  borderColor: cat.color + "30",
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <View style={[styles.catIcon, { backgroundColor: cat.color + "25" }]}>
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
              </View>
              <Text style={[styles.catLabel, { color: colors.foreground }]}>{cat.label}</Text>
              <Text style={[styles.catDesc, { color: colors.mutedForeground }]}>{cat.desc}</Text>
              <View style={[styles.catArrow, { backgroundColor: cat.color }]}>
                <Feather name="arrow-right" size={12} color="#fff" />
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Featured */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Популярные залы</Text>
          <Pressable onPress={() => router.push("/(tabs)/gyms")}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>Все</Text>
          </Pressable>
        </View>
        {featuredGyms.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </View>

      {/* Kids banner */}
      <Pressable
        style={[styles.kidsBanner, { backgroundColor: colors.kids.background }]}
        onPress={() => router.push("/(tabs)/kids")}
      >
        <View style={styles.kidsContent}>
          <Text style={styles.kidsEmoji}>⭐</Text>
          <View style={styles.kidsText}>
            <Text style={[styles.kidsTitle, { color: colors.kids.primary }]}>Детский спорт</Text>
            <Text style={[styles.kidsDesc, { color: colors.foreground }]}>
              Безопасные занятия для малышей в игровой форме
            </Text>
          </View>
          <View style={[styles.kidsArrow, { backgroundColor: colors.kids.primary }]}>
            <Feather name="arrow-right" size={16} color="#fff" />
          </View>
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroGreeting: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchPlaceholder: {
    color: "#999",
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  catCard: {
    width: (SCREEN_W - 50) / 2,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    gap: 6,
    position: "relative",
    overflow: "hidden",
  },
  catIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  catEmoji: {
    fontSize: 22,
  },
  catLabel: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  catDesc: {
    fontSize: 11,
  },
  catArrow: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  kidsBanner: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
  },
  kidsContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  kidsEmoji: {
    fontSize: 36,
  },
  kidsText: { flex: 1 },
  kidsTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  kidsDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  kidsArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
