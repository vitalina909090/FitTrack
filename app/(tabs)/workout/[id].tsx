import { useWorkoutStore } from '@/src/store/workoutStore';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WorkoutDetailScreen = () => {
    const {id} = useLocalSearchParams();
    const workout = useWorkoutStore(state => 
        state.workouts.find(w => w.id === id)
    );

    return (
        <View>
            <Text>{workout?.title || "Тренування не знайдено"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default WorkoutDetailScreen;
