import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';
import { useSession } from '../ctx/ctx';

export default function AppLayout() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <Text>Carregando...</Text>;
    }

    if (!session) {
        return <Redirect href="./sign-in" />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false, // Isso remove o header padrão de todas as telas desse grupo
            }}
        />
    )
}
