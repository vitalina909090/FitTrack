import { useMutation, useQuery } from "@tanstack/react-query";
import { completeWorkout, deleteWorkout, getAllWorkouts, getExercisesByWorkoutId, getWorkoutById, insertWorkoutWithExercises, uncompleteWorkout } from "../db/queries/workouts";
import { queryClient } from "../providers/QueryProvider";
import { NewExercise, NewWorkout } from "../db/schema";

export const useWorkouts = () => {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: () => getAllWorkouts()
  });
}

export const useWorkoutDetail = (id: string) => {
    return useQuery({
      queryKey: ["workouts", id],
      queryFn: async () => {
        const workout = getWorkoutById(id);
        if (!workout) return null;
        const exs = await getExercisesByWorkoutId(id);
        return { ...workout, exercises: exs };
      },
      enabled: !!id
    });
}

export const useAddWorkout = () => {
  return useMutation({
    mutationFn: ({ workout, exercises }: {
        workout: NewWorkout;
        exercises: Omit<NewExercise, "workoutId">[];
    }) => insertWorkoutWithExercises(workout, exercises),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    }
  });
}

export const useDeleteWorkout = () => {
  return useMutation({
    mutationFn: (id: string) => deleteWorkout(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
};

export const useCompleteWorkout = () => {
  return useMutation({
    mutationFn: (id: string) => completeWorkout(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
};

export const useUncompleteWorkout = () => {
  return useMutation({
    mutationFn: (id: string) => uncompleteWorkout(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
};