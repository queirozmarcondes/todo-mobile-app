// app/(app)/_layout.tsx
import { Slot, Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useSession } from '../ctx/ctx';

export default function ProtectedLayout() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!session) {
        return <Redirect href="/sign-in" />;
    }

    return <Slot />;
}
