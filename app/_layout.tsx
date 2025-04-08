import { Slot } from 'expo-router';
import { SessionProvider } from './ctx/ctx';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
