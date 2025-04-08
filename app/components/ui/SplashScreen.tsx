import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/app/constants/Colors";

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todoist</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary.main,
    },
    title: {
        fontSize: 48,
        fontFamily: "SpaceMono-Regular",
        fontWeight: "bold",
        color: Colors.defaultTheme.background,
    },
});
