import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  useAddProgressPhoto,
  useDeleteProgressPhoto,
  usePhotoSourcePicker,
  useProgressPhotos,
} from "@/src/hooks/useProgressPhotos";

import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  SHADOW,
} from "@/src/constants/theme";

export default function ProgressPhotoGallery() {
  const { data: photos = [], isLoading } = useProgressPhotos();
  const { chooseSource } = usePhotoSourcePicker();
  const addPhoto = useAddProgressPhoto();
  const deletePhoto = useDeleteProgressPhoto();

  const handleAdd = async () => {
    const uri = await chooseSource();
    if (!uri) return;
    addPhoto.mutate(uri);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <Text style={styles.loading}>Завантаження фото...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Фото прогресу</Text>

        <Pressable onPress={handleAdd} style={styles.addButton}>
          <Ionicons name="camera-outline" size={18} color={COLORS.surface} />
          <Text style={styles.addButtonText}>Додати</Text>
        </Pressable>
      </View>

      {photos.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="camera-outline" size={48} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>Немає фото</Text>
          <Text style={styles.emptyText}>Фотографуй прогрес раз на тиждень щоб бачити зміни</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.photoWrapper}>
              <View style={styles.photoCard}>
                <Image
                  source={{ uri: item.photoUri }}
                  style={styles.image}
                  contentFit="cover"
                  transition={250}
                />

                <Pressable
                  style={styles.deleteButton}
                  onPress={() =>
                    deletePhoto.mutate({
                      id: item.id,
                      uri: item.photoUri,
                    })
                  }
                >
                  <Ionicons name="trash-outline" size={18} color={COLORS.surface} />
                </Pressable>
              </View>
              {item.createdAt && (
                <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  addButton: {
    flexDirection: "row",
    height: 38,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.xs,
    ...SHADOW.sm,
  },
  addButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  photoWrapper: {
    width: "48%",
  },
  photoCard: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
    ...SHADOW.md,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    position: "absolute",
    right: SPACING.sm,
    top: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    marginTop: SPACING.xs,
    textAlign: "center",
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  emptyCard: {
    flex: 1,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
    minHeight: 220,
    gap: SPACING.xs,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  emptyText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  loading: {
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});