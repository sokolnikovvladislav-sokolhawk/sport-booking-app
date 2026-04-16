import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

interface CategoryHeaderProps {
  title: string;
  subtitle?: string;
  icon: string;
  accentColor?: string;
}

export function CategoryHeader({ title, subtitle, icon, accentColor }: CategoryHeaderProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const accent = accentColor ?? colors.primary;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
          paddingTop: Platform.OS === "web" ? 67 : insets.top + 8,
        },
      ]}
    >
      <View style={[styles.iconWrapper, { backgroundColor: accent + "18" }]}>
        <Feather name={icon as any} size={22} color={accent} />
      </View>
      <View style={styles.textGroup}>
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  textGroup: {
    gap: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 13,
  },
});
