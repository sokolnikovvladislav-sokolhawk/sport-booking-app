import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

const SCREEN_W = Dimensions.get("window").width;

interface PhotoGalleryProps {
  photos: string[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const colors = useColors();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {photos.map((uri, i) => (
          <Pressable key={i} onPress={() => setLightboxIndex(i)}>
            <Image source={{ uri }} style={styles.thumb} />
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        visible={lightboxIndex !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setLightboxIndex(null)}
      >
        <View style={styles.overlay}>
          <Pressable style={styles.closeBtn} onPress={() => setLightboxIndex(null)}>
            <Feather name="x" size={24} color="#fff" />
          </Pressable>
          {lightboxIndex !== null && (
            <>
              <Image
                source={{ uri: photos[lightboxIndex] }}
                style={styles.fullImage}
                resizeMode="contain"
              />
              <Text style={styles.counter}>{lightboxIndex + 1} / {photos.length}</Text>
            </>
          )}
          <View style={styles.navRow}>
            <Pressable
              onPress={() => setLightboxIndex((i) => i !== null && i > 0 ? i - 1 : i)}
              style={[styles.navBtn, { opacity: lightboxIndex === 0 ? 0.3 : 1 }]}
            >
              <Feather name="chevron-left" size={28} color="#fff" />
            </Pressable>
            <Pressable
              onPress={() => setLightboxIndex((i) => i !== null && i < photos.length - 1 ? i + 1 : i)}
              style={[styles.navBtn, { opacity: lightboxIndex === photos.length - 1 ? 0.3 : 1 }]}
            >
              <Feather name="chevron-right" size={28} color="#fff" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    gap: 8,
    paddingRight: 8,
  },
  thumb: {
    width: 120,
    height: 80,
    borderRadius: 10,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  fullImage: {
    width: SCREEN_W,
    height: SCREEN_W * 0.75,
  },
  counter: {
    color: "#fff",
    marginTop: 12,
    fontSize: 14,
  },
  navRow: {
    flexDirection: "row",
    gap: 40,
    marginTop: 20,
  },
  navBtn: {
    padding: 10,
  },
});
