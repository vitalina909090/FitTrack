import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export function usePhotoSourcePicker() {
  const pickSource = (): Promise<'camera' | 'gallery' | null> => {
    return new Promise((resolve) => {
      Alert.alert('Додати фото', 'Оберіть джерело', [
        {
          text: 'Камера',
          onPress: async () => {
            const { granted } = await ImagePicker.requestCameraPermissionsAsync();
            if (!granted) {
              Alert.alert('Немає доступу', 'Дозвольте доступ до камери в налаштуваннях телефону');
              return resolve(null);
            }
            resolve('camera');
          },
        },
        {
          text: 'Галерея',
          onPress: async () => {
            const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!granted) {
              Alert.alert('Немає доступу', 'Дозвольте доступ до галереї в налаштуваннях телефону');
              return resolve(null);
            }
            resolve('gallery');
          },
        },
        { text: 'Скасувати', style: 'cancel', onPress: () => resolve(null) },
      ]);
    });
  };

  return { pickSource };
}