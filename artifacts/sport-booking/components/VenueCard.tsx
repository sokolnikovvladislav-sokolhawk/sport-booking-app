import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useApp } from "@/context/AppContext";
import type { Venue } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

interface VenueCardProps {
  venue: Venue;
  isKids?: boolean;
}

export function VenueCard({ venue, isKids = false }: VenueCardProps) {
  const colors = useColors();
  const { isFavorite, toggleFavorite } = useApp();
  const favorite = isFavorite(venue.id);

  const primaryColor = isKids ? colors.kids.primary : colors.primary;
  const bgColor = isKids ? colors.kids.background : colors.card;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/venue/${venue.id}`);
  };

  const handleFavorite = (e: any) => {
    e.stopPropagation();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleFavorite(venue.id);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: bgColor,
          borderColor: colors.border,
          opacity: pressed ? 0.95 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: venue.image }} style={styles.image} />
        <Pressable
          onPress={handleFavorite}
          style={[styles.heartBtn, { backgroundColor: "rgba(255,255,255,0.9)" }]}
          hitSlop={10}
        >
          <Feather
            name={favorite ? "heart" : "heart"}
            size={18}
            color={favorite ? "#ff3b5c" : "#999"}
          />
        </Pressable>
        {venue.tags.length > 0 && (
          <View style={[styles.tagContainer, { backgroundColor: primaryColor + "ee" }]}>
            <Text style={styles.tagText}>{venue.tags[0]}</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={1}>
            {venue.name}
          </Text>
          <View style={styles.ratingBadge}>
            <Feather name="star" size={12} color="#f59e0b" />
            <Text style={styles.ratingText}>{venue.rating.toFixed(1)}</Text>
          </View>
        </View>
        <View style={styles.addressRow}>
          <Feather name="map-pin" size={12} color={colors.mutedForeground} />
          <Text style={[styles.address, { color: colors.mutedForeground }]} numberOfLines={1}>
            {venue.address}
          </Text>
        </View>
        <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={2}>
          {venue.description}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.price, { color: primaryColor }]}>{venue.price}</Text>
          <View style={styles.reviewsRow}>
            <Feather name="message-circle" size={12} color={colors.mutedForeground} />
            <Text style={[styles.reviews, { color: colors.mutedForeground }]}>
              {venue.reviewCount} отзывов
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  heartBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  tagContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  info: {
    padding: 14,
    gap: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#fff8e1",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#f59e0b",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  address: {
    fontSize: 12,
    flex: 1,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
  },
  reviewsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  reviews: {
    fontSize: 12,
  },
});
