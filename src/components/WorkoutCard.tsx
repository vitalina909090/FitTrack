import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { BORDER_RADIUS, COLORS, FONT_SIZE, SHADOW, SPACING } from "../constants/theme";
import type { Workout } from "../types/workout";
import { categoryText } from "../constants/mockData";

type Props = {
    workout: Workout;
    onPress: (workout: Workout) => void;
    onDelete: (id: string) => void;
    onComplete: (id: string) => void;
};

const SWIPE_THRESHOLD = 60; // скільки потрібно потягнути, щоб показати кнопку
const DELETE_WIDTH = 80; // ширина зони видалення
const COMPLETE_WIDTH = 80;

const SWIPE = {
    CLOSED: 0,
    LEFT_OPEN: 1,
    RIGHT_OPEN: -1,
}

const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("uk-UA", { day: "numeric", month: "short" }).format(
    new Date(iso)
);

const WorkoutCard = ({ workout, onPress, onDelete, onComplete}: Props) => {
    const translateX = useSharedValue(0);
    const openSide = useSharedValue(SWIPE.CLOSED);

    const cardAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const deleteAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            translateX.value,
            [0, DELETE_WIDTH * 0.5, DELETE_WIDTH],
            [0, 0.5, 1],
        ),
        transform: [{
            scale: interpolate(
                translateX.value,
                [0, DELETE_WIDTH],
                [0.7, 1],
            )
        }]
    }));

    const completeAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            translateX.value,
            [0, -COMPLETE_WIDTH * 0.5, -COMPLETE_WIDTH],
            [0, 0.5, 1],
        ),
        transform: [{
            scale: interpolate(
                translateX.value,
                [0, -COMPLETE_WIDTH],
                [0.7, 1],
            )
        }]
    }));    

    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .failOffsetY([-10, 10])
        .onUpdate((event) => {
            if (openSide.value === SWIPE.CLOSED) {
                translateX.value = Math.max(-COMPLETE_WIDTH, Math.min(event.translationX, DELETE_WIDTH));
            } else if (openSide.value === SWIPE.LEFT_OPEN) {
                translateX.value = Math.max(0, Math.min(event.translationX + DELETE_WIDTH, DELETE_WIDTH));
            } else if (openSide.value === SWIPE.RIGHT_OPEN) {
                translateX.value = Math.max(-COMPLETE_WIDTH, Math.min(event.translationX - COMPLETE_WIDTH, 0));
            }
        })
        .onEnd(() => {
            if (translateX.value > SWIPE_THRESHOLD) {
                translateX.value = withSpring(DELETE_WIDTH);
                openSide.value = SWIPE.LEFT_OPEN;
            } else if (translateX.value < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-COMPLETE_WIDTH);
                openSide.value = SWIPE.RIGHT_OPEN;
            } else {
                translateX.value = withSpring(0);
                openSide.value = SWIPE.CLOSED;
            }
        });

    const closeCard = () => {
        translateX.value = withSpring(0);
        openSide.value = SWIPE.CLOSED;
    };

    const handleDelete = () => {
        closeCard();
        onDelete(workout.id);
    };

    const handleComplete = () => {
        closeCard();
        onComplete(workout.id);
    };

    const rightBtn = workout.completedAt
        ? { icon: 'arrow-undo-outline' as keyof typeof Ionicons.glyphMap, text: 'Повернути', color: COLORS.warning }
        : { icon: 'checkmark-done' as keyof typeof Ionicons.glyphMap, text: 'Готово', color: COLORS.success };

    return (
        <View>
            <Animated.View style={[styles.deleteAction, deleteAnimatedStyle]}>
                <Pressable 
                    style={styles.deleteBtn}
                    onPress={handleDelete}
                >
                    <Ionicons name="trash-outline" size={24} color={COLORS.surface} />
                </Pressable>
            </Animated.View>

            <Animated.View style={[styles.completeAction, completeAnimatedStyle]}>
                <Pressable
                    style={[styles.completeBtn, { backgroundColor: rightBtn.color }]}
                    onPress={handleComplete}
                >
                    <Ionicons name={rightBtn.icon} size={24} color={COLORS.surface} />
                    <Text style={styles.textBtn}>{rightBtn.text}</Text>
                </Pressable>
            </Animated.View>

            {/* Картка */}
            <GestureDetector gesture={panGesture}>
                <Animated.View style={cardAnimatedStyle}>
                    <Pressable
                        onPress={() => onPress(workout)}
                        style={styles.card}
                    >
                        <View style={[styles.accent, { backgroundColor: COLORS[workout.category] }]} />                    
                        <View style={styles.body}>
                            <View style={styles.titleRow}>
                                <Text style={styles.title}>
                                    {workout.title}
                                </Text>
                                {workout.completedAt ? (
                                    <View style={[styles.badge, { backgroundColor: COLORS.successLight}]}>
                                        <Ionicons name="checkmark" size={13} color={COLORS.success} />
                                        <Text style={[styles.badgeText, { color: COLORS.success }]}>Виконано</Text>
                                    </View>
                                ) : (
                                    <View style={[styles.badge, { backgroundColor: COLORS[`${workout.category}Light`] }]}>
                                        <Text style={[styles.badgeText, { color: COLORS[workout.category] }]}>
                                            {categoryText[workout.category]}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.metaRow}>
                                <View style={styles.metaItem}>
                                    <Ionicons name="time-outline" size={13} color={COLORS.textSecondary} />
                                    <Text style={styles.metaText}>{workout.duration} хв</Text>
                                </View>

                                <View style={styles.metaItem}>
                                    <Ionicons
                                        name={workout.completedAt ? "checkmark-circle-outline" : "calendar-outline"}
                                        size={13}
                                        color={workout.completedAt ? COLORS.success : COLORS.textSecondary}
                                    />
                                    <Text style={[
                                        styles.metaText,
                                        workout.completedAt && { color: COLORS.success }
                                    ]}>
                                        {formatDate(workout.completedAt ?? workout.scheduledAt)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <Ionicons
                            name={workout.completedAt ? "checkmark-circle" : "chevron-forward"}
                            size={18}
                            color={workout.completedAt ? COLORS.success : COLORS.textSecondary}
                            style={styles.arrow}
                        />
                    </Pressable>
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.md,
        overflow: "hidden",
        ...Platform.select({
        ios: { ...SHADOW.sm },
        android: { elevation: 2 },
        }),
    },
    cardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.985 }],
    },
    accent: {
        width: 4,
        alignSelf: "stretch",
    },
    body: {
        flex: 1,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        gap: SPACING.sm,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.sm,
    },
    title: {
        flex: 1,
        fontSize: FONT_SIZE.md,
        fontWeight: "600",
        color: COLORS.textPrimary,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        fontSize: FONT_SIZE.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        borderRadius: BORDER_RADIUS.full,

    },
    badgeText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: "500",
    },
    metaRow: {
        flexDirection: "row",
        gap: SPACING.md,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    metaText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
    },
    arrow: {
        marginRight: SPACING.md,
    },
    deleteBtn: {
        flex: 1,
        backgroundColor: COLORS.error,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: BORDER_RADIUS.lg,
    },
    deleteAction: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: SPACING.md,
        width: DELETE_WIDTH,
        borderRadius: BORDER_RADIUS.lg,
    },
    completeAction: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: SPACING.md,
        width: COMPLETE_WIDTH,
        borderRadius: BORDER_RADIUS.lg,
    },
    completeBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS.lg,
    },
    textBtn: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '600',
        color: COLORS.surface,
        marginTop: 2,
    },
});

export default WorkoutCard;