import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useWorkoutStore } from '../store/workoutStore';
import { WorkoutCategory } from '../types/workout';
import { COLORS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAddWorkout } from '../hooks/useWorkouts';
import { NewWorkout } from '../db/schema';

type Props = {
    visible: boolean, 
    onClose: () => void  
}

const categories: { label: string; value: WorkoutCategory }[] = [
  { label: 'Сила', value: 'strength' },
  { label: 'Кардіо', value: 'cardio' },
  { label: 'Гнучкість', value: 'flexibility' },
];



const AddWorkoutModal = ({visible, onClose}: Props) => {
    // const addWorkout = useWorkoutStore(state => state.addWorkout);

    const { mutate: addWorkout, isPending } = useAddWorkout();


    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState<WorkoutCategory>('strength');
    const [errors, setErrors] = useState<{ name?: string; duration?: string }>({});

    const handleAdd = () => {
        if (!validate()) return;
        const newWorkout : NewWorkout = {
            id: Date.now().toString(),
            title: name.trim(),
            category,            
            duration: parseInt(duration) || 60,
            scheduledAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),            
        }
        addWorkout(
            { workout: newWorkout, exercises: [] },
            { 
                onSuccess: () => { 
                    handleClose();
                },
                onError: (error) => {
                    console.log(error);
                }
            },

        );
        handleClose();
    };

    const handleClose = () => {
        setErrors({});
        setName('');
        setDuration('');
        setCategory('strength');
        onClose();
    };

    const validate = () => {
        const newErrors: { name?: string; duration?: string } = {};
        
        if (!name.trim()) {
            newErrors.name = 'Введіть назву тренування';
        }
        if (duration && (isNaN(Number(duration)) || Number(duration) <= 0)) {
            newErrors.duration = 'Введіть коректну тривалість';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <Modal 
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"   // IOS
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Нове тренування</Text>
                    <Pressable onPress={handleClose} hitSlop={12}>
                        <Ionicons name="close" size={26} color={COLORS.textPrimary} />
                    </Pressable>
                </View >

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.subtitle}>Назва</Text>
                        <TextInput
                            style={[styles.input, errors.name && styles.inputError]}
                            placeholder="Наприклад: Силове тренування А"
                            placeholderTextColor={COLORS.textTertiary}
                            value={name}
                            onChangeText={setName}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}                        
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.subtitle}>Тривалість (хвилини)</Text>
                        <TextInput
                            style={[styles.input, errors.duration && styles.inputError]}
                            placeholder="60"
                            placeholderTextColor={COLORS.textTertiary}
                            keyboardType="numeric"
                            value={duration}
                            onChangeText={setDuration}
                        />
                        {errors.duration && <Text style={styles.errorText}>{errors.duration}</Text>}                            
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.subtitle}>Категорія</Text>                                      
                        <View style={styles.category}>
                            {categories.map((c) => (
                                <Pressable
                                    key={c.value}
                                    style={[ styles.categoryBtn, category === c.value && styles.categoryBtnActive ]}
                                    onPress={() => setCategory(c.value)}
                                >
                                    <Text style={[ styles.categoryText, category === c.value && styles.categoryTextActive ]}>
                                        {c.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>                        
                    </View>                                        
                </View>

                <Pressable style={styles.addBtn} onPress={handleAdd}>
                    <Text style={styles.addBtnText}>Додати тренування</Text>
                </Pressable>                              
            </SafeAreaView>  

        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        gap: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 25
    },
    form: {
        gap: 15
    },
    inputContainer: {
        gap: 13
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textPrimary,      
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: '500',              
    },
    input: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 15,
        color: COLORS.textPrimary,        
    },
    category: {
        flexDirection: 'row',
        gap: 10
    },
    categoryBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        alignItems: 'center',        
    },
    categoryBtnActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,        
    },
    categoryText: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: '500',        
    },
    categoryTextActive: {
        color: COLORS.surface,
    },
    addBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: 'center',        
    },
    addBtnText: {
        color: COLORS.surface,
        fontSize: 15,
        fontWeight: '600',        
    },
    inputError: {
        borderColor: COLORS.error,
    },
    errorText: {
        fontSize: 11,
        color: COLORS.error,
        marginLeft: 5
    },    

})

export default AddWorkoutModal;
