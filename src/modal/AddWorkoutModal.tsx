import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useWorkoutStore } from '../store/workoutStore';

type Props = {
    visible: boolean, 
    onClose: () => void  
}

const AddWorkoutModal = ({visible, onClose}: Props) => {
    const addWorkout = useWorkoutStore(state => state.addWorkout);

    return (
        <Modal 
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"   // IOS
            onRequestClose={onClose}
        >
            <View >
                <Text>Modal</Text>
                <Pressable onPress={onClose}>
                    <Ionicons name="close" size={60} color="black" />
                </Pressable>   
            </View>  

        </Modal>
    );
}

const styles = StyleSheet.create({})

export default AddWorkoutModal;
