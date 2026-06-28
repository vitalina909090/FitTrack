import { WaterTare } from "@/src/constants/mockData";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

interface Props {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
  handleAddWater: (amount: number) => void;
}

const WaterModal = ({
  modalVisible,
  setModalVisible,
  handleAddWater,
}: Props) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleConfirm = () => {
    if (!selected) return;
    handleAddWater(selected);
    setSelected(null);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setSelected(null);
    setModalVisible(false);
  };

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Виберіть кількість</Text>

          <View style={styles.amounts}>
            {WaterTare.map((item) => (
              <Pressable
                key={item.value}
                style={[
                  styles.amountBtn,
                  selected === item.value && styles.amountBtnSelected,
                ]}
                onPress={() => setSelected(item.value)}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={30}
                  color={
                    selected === item.value
                      ? COLORS.primary
                      : COLORS.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.amountText,
                    selected === item.value && styles.amountTextSelected,
                  ]}
                >
                  {item.value} ml
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[styles.btn, styles.btnCancel]}
              onPress={handleCancel}
            >
              <Text style={styles.btnCancelText}>Скасувати</Text>
            </Pressable>
            <Pressable
              style={[
                styles.btn,
                styles.btnOk,
                !selected && styles.btnOkDisabled,
              ]}
              onPress={handleConfirm}
              disabled={!selected}
            >
              <Text style={styles.btnOkText}>ОК</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    width: "85%",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  amounts: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  amountBtn: {
    flex: 1,
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  amountBtnSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
  },
  amountText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  amountTextSelected: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  btn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  btnCancel: {
    backgroundColor: COLORS.border,
  },
  btnCancelText: {
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  btnOk: {
    backgroundColor: COLORS.primary,
  },
  btnOkDisabled: {
    opacity: 0.4,
  },
  btnOkText: {
    color: COLORS.surface,
    fontWeight: "600",
  },
});

export default WaterModal;
