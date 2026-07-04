import WorkoutCard from '@/src/components/WorkoutCard';
import { COLORS } from '@/src/constants/theme';
import { useCompleteWorkout, useDeleteWorkout, useUncompleteWorkout, useWorkouts } from '@/src/hooks/useWorkouts';
import AddWorkoutModal from '@/src/modal/AddWorkoutModal';
import { useUIStore } from '@/src/store/uiStore';
import { useWorkoutStore } from '@/src/store/workoutStore';
import type { Workout } from '@/src/types/workout';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, SectionList, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    const { data: workouts, isLoading, isError } = useWorkouts();

    const { mutate: deleteWorkout } = useDeleteWorkout();
    const { mutate: completeWorkout } = useCompleteWorkout();
    const { mutate: uncompleteWorkout } = useUncompleteWorkout();

    const router = useRouter();

    const isModalOpen = useUIStore((state) => state.isAddWorkoutModalOpen);
    const closeModal = useUIStore((state) => state.closeAddWorkoutModal);

    const handleWorkoutPress = (workout: Workout) => {
        router.push({ pathname: '/workout/[id]', params: { id: workout.id } });
    };

    const active = (workouts ?? []).filter(w => !w.completedAt);
    const completed = (workouts ?? []).filter(w => w.completedAt);

    const sections = [
        { title: `Активні (${active.length})`, data: active, isCompleted: false },
        { title: `Виконані (${completed.length})`, data: completed, isCompleted: true },
    ];

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text>Loading...</Text>
                </View>
            ) : isError ? (
                <View style={styles.center}>
                    <Text>Error</Text>
                </View>
            ) : (
                <SectionList
                    sections={sections}
                    keyExtractor={item => item.id}
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                    )}
                    renderItem={({ item, section }) => (
                        <WorkoutCard
                            workout={item}
                            onPress={handleWorkoutPress}
                            onDelete={deleteWorkout}
                            onComplete={section.isCompleted ? uncompleteWorkout : completeWorkout}
                        />
                    )}
                    contentContainerStyle={styles.list}
                />
            )}

            <AddWorkoutModal visible={isModalOpen} onClose={closeModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },    
    list: {
        padding: 16,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        marginTop: 4,
    },

});

export default HomeScreen;