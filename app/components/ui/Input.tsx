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
                accessibilityLabel={label}  // Acessibilidade
                accessibilityHint={errorMessage ? 'Por favor, corrija o erro.' : 'Campo de entrada'} // Indicação de erro se houver
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
        borderWidth: 1,  // Adicionando borda padrão
        borderColor: Colors.secondary.main,  // Cor da borda padrão
    },
    inputError: {
        borderColor: 'red',  // Cor de borda quando há erro
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
    },
});
