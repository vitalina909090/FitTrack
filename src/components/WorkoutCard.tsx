import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Workout } from '../types/workout';

type Props = {
    workout: Workout
    onPress: (workout: Workout) => void
}

const WorkoutCard = ({workout, onPress}: Props) => {
    return (
        <Pressable onPress={() => onPress(workout)}>
            <View>
                <Text>{workout.title}</Text>
            </View>
        </Pressable>

    );
}

const styles = StyleSheet.create({})

export default WorkoutCard;
