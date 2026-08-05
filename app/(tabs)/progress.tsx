import ProgressPhotoGallery from "@/src/components/ProgressPhotoGallery";
import usePedometer from "@/src/hooks/usePedometer";
import { StyleSheet, Text, View } from "react-native";

export default function ProgressScreen() {
  const { isAvailable, isPermissionGranted, steps, error } = usePedometer();

  return (
    <View style={styles.container}>
      <View style={styles.pedometer}>
        {!isAvailable && (
          <Text>{error ?? "Перевірка доступності крокоміра..."}</Text>
        )}
        {isAvailable && !isPermissionGranted && <Text>{error}</Text>}

        <Text>{steps} кроків</Text>

      </View>


      <ProgressPhotoGallery />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    gap: 20,
  },
  pedometer: {
    alignItems: 'center',    
  }
});
