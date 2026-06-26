import WorkoutCard from '@/src/components/WorkoutCard';
import { MOCK_WORKOUTS } from '@/src/constants/mockData';
import type { Workout } from '@/src/types/workout';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  const router = useRouter();

  const handleWorkoutPress = (workout: Workout) => {
    router.push({ pathname: "/workout/[id]", params: { id: workout.id } });
  }

  return (
    <View>
      <Text>Home</Text>
      <FlatList
        data={MOCK_WORKOUTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <WorkoutCard workout={item} onPress={handleWorkoutPress} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({})

export default HomeScreen;
