import React, { useEffect } from 'react';
import { Pressable, StyleSheet} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Drawer from 'expo-router/drawer';
import DrawerContent from '@/src/components/DrawerContent';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { COLORS } from '@/src/constants/theme';
import { runMigrations } from '@/src/db/migrations';
import { seedDatabase } from '@/src/db/seed';
import QueryProvider from '@/src/providers/QueryProvider';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const navigation = useNavigation();

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    useEffect(() => {
        const init = async () => {
            try {
                runMigrations();
                await seedDatabase();
            }
            catch (error) {
                console.error('DB init error: ', error);
            }
            finally {
                SplashScreen.hideAsync();
            }
        }

        init();
    }, []);
    
    return (
        <QueryProvider>
            <GestureHandlerRootView>
                <Drawer
                    drawerContent={(props) => <DrawerContent {...props} />}
                    screenOptions={{
                        drawerType: "front",
                        headerShown: false,
                        swipeEdgeWidth: 150,
                    }}>
                    <Drawer.Screen name="(tabs)" />
                    <Drawer.Screen name="settings"
                        options={{
                            headerShown: true,
                            title: 'Налаштування',
                            headerLeft: () => (
                                <Pressable 
                                    onPress={openDrawer} 
                                    hitSlop={10}
                                    style={{ marginHorizontal: 10 }}
                                >
                                    <Ionicons name="menu" size={26} color={COLORS.primary} />
                                </Pressable>
                            )
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        </QueryProvider>

    );
}

const styles = StyleSheet.create({})

export default RootLayout;
