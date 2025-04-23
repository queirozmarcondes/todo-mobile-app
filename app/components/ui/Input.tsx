import React from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps, ViewStyle } from 'react-native';
import { Colors } from '@/app/constants/Colors';

interface InputProps extends TextInputProps {
    label: string;
    containerStyle?: ViewStyle;
    errorMessage?: string | null;
}

export function Input({ label, containerStyle, errorMessage, ...props }: InputProps) {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, errorMessage ? styles.inputError : undefined]}
                {...props}
            />
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: Colors.defaultTheme.tint,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        color: Colors.secondary.main,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: Colors.defaultTheme.background,

    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
    },
});
