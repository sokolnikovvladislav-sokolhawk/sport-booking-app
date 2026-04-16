import React from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryHeader } from "@/components/CategoryHeader";
import { VenueCard } from "@/components/VenueCard";
import { getVenuesByCategory } from "@/data/venues";
import { useColors } from "@/hooks/useColors";

export default function SectionsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const venues = getVenuesByCategory("sections");

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 84,
      }}
    >
      <CategoryHeader
        title="Спортивные секции"
        subtitle={`${venues.length} секции доступно`}
        icon="award"
        accentColor="#3B82F6"
      />
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      >
        {venues.map((v) => (
          <VenueCard key={v.id} venue={v} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {},
  listContent: { padding: 16 },
});
