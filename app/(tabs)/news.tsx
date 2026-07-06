import { COLORS, SHADOW } from "@/src/constants/theme";
import { useNews } from "@/src/hooks/useNews";
import React from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const News = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNews();

  const articles = data?.pages.flatMap((page) => page.articles);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text>Loading...</Text>
        </View>
      ) : isError ? (
        <View style={styles.center}>
          <Text>Error: {error?.message}</Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, id) => `${item.url}-${id}`}
          contentContainerStyle={styles.listContent}
          onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={{ marginVertical: 16 }} color={COLORS.primary} />
            ) : null
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.urlToImage ? (
                <Image source={{ uri: item.urlToImage }} style={styles.image} />
              ) : (
                <View style={[styles.image, styles.imagePlaceholder]}>
                  <Text style={styles.imagePlaceholderText}>Фото не знайдено</Text>
                </View>
              )}
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>

                {item.description ? (
                  <Text style={styles.description} numberOfLines={3}>
                    {item.description}
                  </Text>
                ) : null}

                <View style={{ borderColor: COLORS.border, borderWidth: 0.3 }} />

                <View style={styles.footer}>
                  <Text style={styles.author} numberOfLines={1}>
                    {item.author || "Автор не вказаний"}
                  </Text>
                  <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  listContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    ...SHADOW.md
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: COLORS.border,
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  content: {
    padding: 14,
  },
  title: {
    fontWeight: "700",
    fontSize: 17,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  author: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
    marginRight: 8,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
export default News;