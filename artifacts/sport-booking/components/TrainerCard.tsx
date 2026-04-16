import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import type { Trainer } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

interface TrainerCardProps {
  trainer: Trainer;
  onPress?: (trainer: Trainer) => void;
  selected?: boolean;
  isKids?: boolean;
}

export function TrainerCard({ trainer, onPress, selected, isKids }: TrainerCardProps) {
  const colors = useColors();
  const accentColor = isKids ? colors.kids.primary : colors.primary;

  return (
    <Pressable
      onPress={() => onPress?.(trainer)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: selected ? accentColor + "15" : colors.card,
          borderColor: selected ? accentColor : colors.border,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <Image source={{ uri: trainer.photo }} style={styles.photo} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.foreground }]}>{trainer.name}</Text>
        <Text style={[styles.spec, { color: accentColor }]}>{trainer.specialization}</Text>
        <View style={styles.row}>
          <View style={styles.ratingRow}>
            <Feather name="star" size={12} color="#f59e0b" />
            <Text style={styles.rating}>{trainer.rating.toFixed(1)}</Text>
          </View>
          <Text style={[styles.exp, { color: colors.mutedForeground }]}>• {trainer.experience}</Text>
        </View>
        <Text style={[styles.desc, { color: colors.mutedForeground }]} numberOfLines={2}>
          {trainer.description}
        </Text>
        <Text style={[styles.price, { color: accentColor }]}>{trainer.price}</Text>
      </View>
      {selected && (
        <View style={[styles.check, { backgroundColor: accentColor }]}>
          <Feather name="check" size={14} color="#fff" />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 12,
    gap: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  photo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    resizeMode: "cover",
  },
  info: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
  },
  spec: {
    fontSize: 12,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  rating: {
    fontSize: 12,
    fontWeight: "700",
    color: "#f59e0b",
  },
  exp: {
    fontSize: 12,
  },
  desc: {
    fontSize: 12,
    lineHeight: 17,
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
  },
  check: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
