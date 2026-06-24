import WaterModal from "@/modal/WaterModal";
import WaterLogItem from "@/src/components/WaterLogItem";
import { COLORS } from "@/src/constants/theme";
import { WaterLog } from "@/src/types/workout";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const WaterTracker = () => {
  const [currentMl, setCurrentMl] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [waterLog, setLog] = useState<WaterLog[]>([]);

  const handleAddWater = (amount: number) => {
    setCurrentMl((prev) => prev + amount);
    const time = new Date().toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
    setLog((prev) => [{ id: Date.now().toString(), amount, time }, ...prev]);
  };

  const fill = (currentMl / 1500) * 100;

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={230}
        width={15}
        fill={fill}
        tintColor={COLORS.primary}
        backgroundColor={COLORS.border}
      >
        {() => (
          <View style={styles.textContainer}>
            <Text style={styles.textML}>
              {currentMl}/{1500} ml
            </Text>
            <Text style={styles.textSubtitle}>Daily Drink Target</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Додати</Text>
      </Pressable>

      {waterLog.length > 0 && (
        <FlatList
          data={waterLog}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WaterLogItem amount={item.amount} time={item.time} />
          )}
          contentContainerStyle={{ gap: 8 }}
          style={styles.waterLog}
          showsVerticalScrollIndicator={false}
        />
      )}

      <WaterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAddWater={handleAddWater}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    paddingHorizontal: 16,
    gap: 20,
    backgroundColor: COLORS.background,
  },
  textContainer: {
    alignItems: "center",
    gap: 4,
  },
  textML: {
    fontWeight: "bold",
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  textSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.surface,
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "uppercase",
  },
  waterLog: {
    width: "100%",
    maxHeight: 260,
  },
});

export default WaterTracker;