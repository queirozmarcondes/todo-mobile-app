import { Slot } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { SessionProvider } from './ctx/ctx';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from './constants/Colors';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color={Colors.defaultTheme.tint}
          accessibilityRole="progressbar"
        />
      </View>
    );
  }

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
