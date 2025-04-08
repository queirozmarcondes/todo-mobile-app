import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
} from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    loading?: boolean;
}

export function Button({
    title,
    onPress,
    style,
    textStyle,
    disabled = false,
    loading = false,
}: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            style={[styles.button, style, isDisabled && styles.buttonDisabled]}
            onPress={onPress}
            disabled={isDisabled}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#A5D6A7',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
