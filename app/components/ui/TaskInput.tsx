// src/components/ui/TaskInput.tsx

import React from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/app/constants/Colors';


interface TaskInputProps {
    value: string;
    onChangeText: (text: string) => void;
    onAddTask: () => void;
}

export function TaskInput({ value, onChangeText, onAddTask }: TaskInputProps) {
    return (
        <View style={styles.inputCard}>
            {/* Campo de Input */}
            <TextInput
                placeholder="Digite uma nova tarefa"
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
            />
            {/* Ícone de adição */}
            <Pressable onPress={onAddTask}>
                <Ionicons name="add-circle" size={32} color={Colors.defaultTheme.tabIconSelected} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    inputCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 12,
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        color: Colors.defaultTheme.tabIconDefault,
    },
});
