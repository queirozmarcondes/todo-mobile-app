import React from 'react';
import { FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Colors } from '@/app/constants/Colors';

type Task = {
    id: string;
    title: string;
    completed: boolean;
};

type TaskListProps = {
    tasks: Task[];
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
};

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
    return (
        <FlatList
            data={tasks}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
            renderItem={({ item, index }) => (
                <Animatable.View
                    animation="fadeInUp"
                    delay={index * 100}
                    style={styles.taskItem}
                >
                    <Pressable onPress={() => onToggleTask(item.id)}>
                        <Ionicons
                            name={item.completed ? 'checkbox' : 'square-outline'}
                            size={24}
                            color={item.completed ? Colors.defaultTheme.tabIconSelected : Colors.defaultTheme.tabIconDefault}
                        />
                    </Pressable>
                    <Text
                        style={[
                            styles.taskText,
                            item.completed && {
                                textDecorationLine: 'line-through',
                                color: '#aaa',
                            },
                        ]}
                    >
                        {item.title}
                    </Text>
                    <Pressable onPress={() => onDeleteTask(item.id)}>
                        <Ionicons name="trash-outline" size={24} color={Colors.defaultTheme.tint} />
                    </Pressable>
                </Animatable.View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    taskItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
});
