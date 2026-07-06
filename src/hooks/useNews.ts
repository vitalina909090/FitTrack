import { useInfiniteQuery} from "@tanstack/react-query";
import { getAllNews } from "../db/queries/news";
import Constants from "expo-constants";

const {  pageSize } = Constants.expoConfig?.extra || {};

export const useNews = () => {
  return useInfiniteQuery({
    queryKey: ["news"],
    queryFn: ({ pageParam = 1 }) => getAllNews(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.length * pageSize;
      return loadedCount < lastPage.totalResults ? allPages.length + 1 : undefined;
    },
  });
}