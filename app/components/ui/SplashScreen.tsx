import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';  // Para navegação
import { Colors } from "@/app/constants/Colors";

export default function SplashScreen() {
    const router = useRouter();
    const [fadeAnim] = useState(new Animated.Value(0));  // Inicializa a animação

    useEffect(() => {
        // Anima o fade-in do texto após a carga inicial
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,  // Duração da animação
            useNativeDriver: true,
        }).start();

        // Navega após a animação (2 segundos após o início)
        setTimeout(() => {
            router.replace('/sign-in');  // Navega para a tela de login
        }, 2000);
    }, [fadeAnim, router]);

    return (
        <View style={styles.container}>
            <Image
                source={require("@/assets/images/splash-icon.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Todoist</Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.defaultTheme.background,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 48,
        fontFamily: "Inter_700Bold",
        fontWeight: "bold",
        color: Colors.defaultTheme.text,
    },
});
