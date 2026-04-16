import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Category = "gyms" | "sections" | "medical" | "kids";

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  description: string;
  photo: string;
  price: string;
}

export interface Venue {
  id: string;
  category: Category;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  description: string;
  fullDescription: string;
  price: string;
  image: string;
  photos: string[];
  trainers: Trainer[];
  reviews: Review[];
  tags: string[];
  schedule: Record<string, TimeSlot[]>;
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  venueImage: string;
  trainerId?: string;
  trainerName?: string;
  date: string;
  time: string;
  category: Category;
  status: "confirmed" | "pending" | "cancelled";
  price: string;
  createdAt: string;
}

interface AppContextValue {
  favorites: string[];
  bookings: Booking[];
  toggleFavorite: (venueId: string) => void;
  isFavorite: (venueId: string) => boolean;
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
  cancelBooking: (bookingId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [favData, bookData] = await Promise.all([
          AsyncStorage.getItem("favorites"),
          AsyncStorage.getItem("bookings"),
        ]);
        if (favData) setFavorites(JSON.parse(favData));
        if (bookData) setBookings(JSON.parse(bookData));
      } catch {}
    };
    load();
  }, []);

  const toggleFavorite = useCallback((venueId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(venueId)
        ? prev.filter((id) => id !== venueId)
        : [...prev, venueId];
      AsyncStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (venueId: string) => favorites.includes(venueId),
    [favorites]
  );

  const addBooking = useCallback((booking: Omit<Booking, "id" | "createdAt">) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => {
      const next = [newBooking, ...prev];
      AsyncStorage.setItem("bookings", JSON.stringify(next));
      return next;
    });
  }, []);

  const cancelBooking = useCallback((bookingId: string) => {
    setBookings((prev) => {
      const next = prev.map((b) =>
        b.id === bookingId ? { ...b, status: "cancelled" as const } : b
      );
      AsyncStorage.setItem("bookings", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ favorites, bookings, toggleFavorite, isFavorite, addBooking, cancelBooking }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
