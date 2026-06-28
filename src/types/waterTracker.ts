export type WaterLog = {
  id: string;
  amount: number;
  time: string;
};

export type WaterTareItem = {
  value: number;
  icon: 'cup' | 'bottle-tonic-outline' | 'bottle-wine-outline';
};