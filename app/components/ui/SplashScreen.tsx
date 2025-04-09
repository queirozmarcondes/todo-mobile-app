import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "@/app/constants/Colors";

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require("@/assets/images/splash-icon.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Todoist</Text>
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
