import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import type { Review } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const colors = useColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>
            {review.author[0]}
          </Text>
        </View>
        <View style={styles.authorInfo}>
          <Text style={[styles.author, { color: colors.foreground }]}>{review.author}</Text>
          <Text style={[styles.date, { color: colors.mutedForeground }]}>{review.date}</Text>
        </View>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Feather
              key={star}
              name="star"
              size={13}
              color={star <= review.rating ? "#f59e0b" : colors.border}
            />
          ))}
        </View>
      </View>
      <Text style={[styles.text, { color: colors.foreground }]}>{review.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
  },
  authorInfo: {
    flex: 1,
    gap: 1,
  },
  author: {
    fontSize: 14,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: "row",
    gap: 2,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});
