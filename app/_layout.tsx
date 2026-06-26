import React from 'react';
import { Pressable, StyleSheet} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Drawer from 'expo-router/drawer';
import DrawerContent from '@/src/components/DrawerContent';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { COLORS } from '@/src/constants/theme';

const RootLayout = () => {
    const navigation = useNavigation();

    const openDrawer = () => {

        navigation.dispatch(DrawerActions.openDrawer());
    };
    
    return (
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
    );
}

const styles = StyleSheet.create({})

export default RootLayout;
