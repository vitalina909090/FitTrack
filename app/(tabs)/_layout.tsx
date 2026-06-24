import { COLORS } from '@/src/constants/theme';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
 

const TabLayout = () => {
    return < Tabs
        screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textTertiary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 0.5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 17,
        },
        headerShadowVisible: false,
      }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Тренування",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                        name={focused ? "barbell" : "barbell-outline"}
                        size={size}
                        color={color}
                    />
                )
            }}
        ></Tabs.Screen>

        <Tabs.Screen
            name="progress"
            options={{
                title: "Прогрес",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons 
                        name={focused ? "trending-up" : "trending-up-outline"} 
                        size={size}
                        color={color}
                    />
                )
            }}
        ></Tabs.Screen>

        <Tabs.Screen
            name="profile"
            options={{
                title: "Профіль",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons 
                        name={focused ? "person" : "person-outline"} 
                        size={size}
                        color={color}
                    />
                )
            }}
        ></Tabs.Screen>

        <Tabs.Screen
            name="waterTracker"
            options={{
                title: "Трекер води",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons 
                        name={focused ? "water" : "water-outline"} 
                        size={size}
                        color={color}
                    />
                )
            }}
        ></Tabs.Screen>        
    </ Tabs>;
}

const styles = StyleSheet.create({})

export default TabLayout;
