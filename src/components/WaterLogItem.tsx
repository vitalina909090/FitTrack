import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Props {
    amount: number;
    time: string;
}

const WaterLogItem = ({ amount, time }: Props) => (
    <View style={styles.container}>
        <View style={styles.icon}>
            <MaterialCommunityIcons name="water" size={18} color={COLORS.primary} />
        </View>
        <Text style={styles.amount}>+{amount} ml</Text>
        <Text style={styles.time}>{time}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: COLORS.surface,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: 0.5,
        borderColor: COLORS.border,
    },
    icon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    amount: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.textPrimary,
        flex: 1,
    },
    time: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
});

export default WaterLogItem;