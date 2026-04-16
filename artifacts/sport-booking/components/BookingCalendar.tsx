import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import type { TimeSlot, Venue } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

interface BookingCalendarProps {
  venue: Venue;
  onConfirm: (date: string, slot: TimeSlot) => void;
  accentColor?: string;
}

const DAYS_RU = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const MONTHS_RU = ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];

function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}

function getDaysRange(n: number) {
  const days: Date[] = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

export function BookingCalendar({ venue, onConfirm, accentColor }: BookingCalendarProps) {
  const colors = useColors();
  const accent = accentColor ?? colors.primary;
  const days = getDaysRange(14);
  const [selectedDate, setSelectedDate] = useState(formatDate(days[0]));
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const slots = venue.schedule[selectedDate] ?? [];

  const handleSlotPress = (slot: TimeSlot) => {
    if (!slot.available) return;
    Haptics.selectionAsync();
    setSelectedSlot(slot);
  };

  const handleDatePress = (day: Date) => {
    Haptics.selectionAsync();
    setSelectedDate(formatDate(day));
    setSelectedSlot(null);
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onConfirm(selectedDate, selectedSlot);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Выберите дату</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.datesScroll}
        contentContainerStyle={styles.datesContent}
      >
        {days.map((day) => {
          const key = formatDate(day);
          const isSelected = key === selectedDate;
          const daySlots = venue.schedule[key] ?? [];
          const hasAvailable = daySlots.some((s) => s.available);
          return (
            <Pressable
              key={key}
              onPress={() => handleDatePress(day)}
              style={[
                styles.dayBtn,
                {
                  backgroundColor: isSelected ? accent : colors.card,
                  borderColor: isSelected ? accent : colors.border,
                  opacity: hasAvailable ? 1 : 0.5,
                },
              ]}
            >
              <Text style={[styles.dayName, { color: isSelected ? "#fff" : colors.mutedForeground }]}>
                {DAYS_RU[day.getDay()]}
              </Text>
              <Text style={[styles.dayNum, { color: isSelected ? "#fff" : colors.foreground }]}>
                {day.getDate()}
              </Text>
              <Text style={[styles.dayMonth, { color: isSelected ? "rgba(255,255,255,0.8)" : colors.mutedForeground }]}>
                {MONTHS_RU[day.getMonth()]}
              </Text>
              {hasAvailable && !isSelected && (
                <View style={[styles.dot, { backgroundColor: accent }]} />
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 16 }]}>
        Свободное время
      </Text>
      <View style={styles.slotsGrid}>
        {slots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          return (
            <Pressable
              key={slot.id}
              onPress={() => handleSlotPress(slot)}
              style={[
                styles.slotBtn,
                {
                  backgroundColor: isSelected
                    ? accent
                    : slot.available
                    ? colors.card
                    : colors.muted,
                  borderColor: isSelected ? accent : slot.available ? colors.border : "transparent",
                  opacity: slot.available ? 1 : 0.4,
                },
              ]}
              disabled={!slot.available}
            >
              <Text
                style={[
                  styles.slotTime,
                  { color: isSelected ? "#fff" : slot.available ? colors.foreground : colors.mutedForeground },
                ]}
              >
                {slot.time}
              </Text>
              {!slot.available && (
                <Text style={[styles.slotBusy, { color: colors.mutedForeground }]}>занято</Text>
              )}
            </Pressable>
          );
        })}
      </View>

      {selectedSlot && (
        <Pressable
          onPress={handleConfirm}
          style={[styles.confirmBtn, { backgroundColor: accent }]}
        >
          <Feather name="check-circle" size={18} color="#fff" />
          <Text style={styles.confirmText}>
            Забронировать на {selectedSlot.time}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  datesScroll: {
    marginHorizontal: -4,
  },
  datesContent: {
    paddingHorizontal: 4,
    gap: 8,
  },
  dayBtn: {
    width: 60,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: "center",
    gap: 2,
    position: "relative",
  },
  dayName: {
    fontSize: 11,
    fontWeight: "500",
  },
  dayNum: {
    fontSize: 18,
    fontWeight: "800",
  },
  dayMonth: {
    fontSize: 10,
    fontWeight: "500",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 2,
  },
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  slotBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    minWidth: 72,
  },
  slotTime: {
    fontSize: 14,
    fontWeight: "700",
  },
  slotBusy: {
    fontSize: 9,
    marginTop: 1,
  },
  confirmBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 14,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
