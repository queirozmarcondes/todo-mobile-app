import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useSession } from '../ctx/ctx';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { TaskInput } from '../components/ui/TaskInput';  // Importando o novo componente
import { TaskList } from '../components/ui/TaskList';

import { Colors } from '../constants/Colors';

type Task = {
    id: string;
    title: string;
    completed: boolean;
};

export default function TodoScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState('');

    const { signOut } = useSession();
    const router = useRouter();

    const handleAddTask = () => {
        if (!input.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title: input,
            completed: false,
        };

        setTasks(prev => [newTask, ...prev]);
        setInput('');
    };

    const handleToggleTask = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleDeleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const handleLogout = async () => {
        await signOut();
        router.replace('/sign-in');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: Colors.defaultTheme.background }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Header com animação */}
            <Animatable.View
                animation="fadeInDown"
                duration={700}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Todo</Text>
                <Pressable onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={28} color={Colors.defaultTheme.tabIconSelected} />
                </Pressable>
            </Animatable.View>

            {/* Componente TaskInput */}
            <Animatable.View animation="fadeInUp" duration={700} style={styles.inputCard}>
                <TaskInput
                    value={input}
                    onChangeText={setInput}
                    onAddTask={handleAddTask}
                />
            </Animatable.View>

            {/* Componente TaskList */}
            <TaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.defaultTheme.tint,
    },
    inputCard: {
        marginHorizontal: 20,
        marginTop: 20,
    },
});
