import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { COLORS, SHADOW } from '@/src/constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
    const router = useRouter();

    const [workoutToggle, setWorkoutToggle] = useState(false);
    const workoutToggleSwitch = () => setWorkoutToggle(previousState => !previousState);
    
    const [themeToggle, setThemeToggle] = useState(false);
    const themeToggleSwitch = () => setThemeToggle(previousState => !previousState);
    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Загальні</Text>
            <View style={[styles.settingsBox, SHADOW.sm]}>
                <View style={styles.notification}>
                    <Fontisto name="bell" size={18} color={COLORS.primary} />
                    <Text style={styles.notificationText}>Нагадування тренувань</Text>
                    <Switch
                        trackColor={{ false: COLORS.textTertiary, true: COLORS.secondary }}
                        thumbColor={workoutToggle ? COLORS.primary : '#f4f3f4'}
                        onValueChange={workoutToggleSwitch}
                        value={workoutToggle}
                    />                    
                </View>

                <View style={styles.divider} />

                <View style={styles.notification}>
                    <FontAwesome name="moon-o" size={20} color={COLORS.primary} />
                    <Text style={styles.notificationText}>Темна тема</Text>
                    <Switch
                        trackColor={{ false: COLORS.textTertiary, true: COLORS.secondary }}
                        thumbColor={themeToggle ? COLORS.primary : '#f4f3f4'}
                        onValueChange={themeToggleSwitch}
                        value={themeToggle}
                    />                    
                </View>
            </View>
            <Text style={styles.title}>Аккаунт</Text>
            <View style={[styles.settingsBox, SHADOW.sm]}>
                <Pressable style={styles.notification} onPress={() => router.push("/profile")}>
                    <Ionicons name="person-outline" size={20} color={COLORS.primary} />
                    <Text style={styles.notificationText}>Профіль</Text>
                    <MaterialIcons name="arrow-forward-ios" size={15} color={COLORS.textTertiary} />                    
                </Pressable>

                <View style={styles.divider} />

                <Pressable style={styles.notification} onPress={() => router.push("/privacy")}>
                    <Ionicons name="shield-outline" size={20} color={COLORS.primary} />
                    <Text style={styles.notificationText}>Конфіденційність</Text>
                    <MaterialIcons name="arrow-forward-ios" size={15} color={COLORS.textTertiary} />                    
                </Pressable>
            </View>
            <Text style={styles.footerText}>FitTrack v1.0.0 Тиждень 3</Text>           
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontSize: 13.5,
        color: COLORS.textTertiary,
        marginBottom: 10,
        marginLeft: 5,
        fontWeight: '600',        
    },
    settingsBox: {
        backgroundColor: COLORS.surface,
        borderRadius: 10,
        marginBottom: 20
    },
    notification: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    notificationText: {
        flex: 1,
        fontSize: 15,
        color: COLORS.textPrimary,
        marginLeft: 14
    },
    divider: {
        height: 0.8,
        backgroundColor: COLORS.border,
        width: '70%',
        alignSelf: 'center'
    },
    footerText: {
        color: COLORS.textTertiary,
        textAlign: 'center',
        fontSize: 12
    }

})

export default SettingsScreen;
