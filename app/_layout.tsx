import React, { useEffect } from 'react';
import { Alert, Pressable, StyleSheet} from 'react-native';
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
import * as Notifications from 'expo-notifications';
import { getNotificationPushToken } from '@/src/hooks/notifications/useNotification';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
 
 

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

    useEffect(() => {
        const permissionNotification = async () => {
            const { granted } = await Notifications.requestPermissionsAsync();
            if (!granted) {
                Alert.alert('Немає дозвлу на надсилання сповіщень');
                return;
            }
        }
        permissionNotification();
    }, [])
         
    // слухач для отримання сповіщень
    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener((res) => {
            const data = res.notification.request.content.data;
            Alert.alert('Отримано сповіщення', JSON.stringify(data))
        });
        return () => subscription.remove();
    }, [])

    useEffect(() => {
        getNotificationPushToken().then((token) => {
            if (token) {
                fetch('http://192.168.31.167:3000/api/register-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                }).catch((error) => {
                    console.error('Не вдалося надіслати токен: ', error);
                });
            }
        });
    }, [])

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
