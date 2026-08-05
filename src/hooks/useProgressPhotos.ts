import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { Directory, File, Paths } from "expo-file-system";
import { nanoid } from "nanoid/non-secure";
import { deleteProgressPhoto, getAllProgressPhotos, insertProgressPhoto } from "@/src/db/queries/progressPhotos";
import type { NewProgressPhoto } from "@/src/db/schema";

const QUERY_KEY = ["progressPhotos"];

export function useProgressPhotos() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await getAllProgressPhotos();
    },
  });
}

export function usePhotoSourcePicker() {
  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Немає доступу", "Дозвольте доступ до камери");
      return null;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsEditing: true,
      aspect: [3, 4],
    });
    if (result.canceled) {
      return null;
    }
    return result.assets[0].uri;
  };

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Немає доступу", "Дозвольте доступ до галереї");
      return null;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsEditing: true,
      aspect: [3, 4],
    });
    if (result.canceled) {
      return null;
    }
    return result.assets[0].uri;
  };

  const chooseSource = () => {
    return new Promise<string | null>((resolve) => {
      Alert.alert("Додати фото", "Оберіть джерело", [
        {
          text: "Камера",
          onPress: async () => {
            resolve(await pickFromCamera());
          },
        },
        {
          text: "Галерея",
          onPress: async () => {
            resolve(await pickFromGallery());
          },
        },
        {
          text: "Скасувати",
          style: "cancel",
          onPress: () => resolve(null),
        },
      ]);
    });
  };

  return {
    chooseSource,
  };
}

export function useAddProgressPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uri: string) => {
      const directory = new Directory(Paths.document, "progress-photos");
      if (!directory.exists) {
        directory.create();
      }
      const destination = new File(directory, `progress_${Date.now()}.jpg`);
      const source = new File(uri);
      await source.copy(destination);
      const photo: NewProgressPhoto = {
        id: nanoid(),
        photoUri: destination.uri,
        createdAt: new Date().toISOString(),
      };
      await insertProgressPhoto(photo);
      return photo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}

export function useDeleteProgressPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, uri }: { id: string; uri: string }) => {
      const file = new File(uri);
      if (file.exists) {
        file.delete();
      }
      await deleteProgressPhoto(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}
