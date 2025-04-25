import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { useSession } from './ctx/ctx';
import { Colors } from './constants/Colors';

export default function SignInScreen() {
    const router = useRouter();
    const { signIn } = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            setErrorMessage('Por favor, preencha todos os campos!');
            return;
        }

        setErrorMessage(null);
        setLoading(true);

        try {
            // Chama a função signIn, sem esperar por um valor de retorno
            await signIn(email, password);

            // Se o login for bem-sucedido, redireciona para a tela de tarefas
            router.replace('/todo');
        } catch (error) {
            // Caso ocorra algum erro no login
            setErrorMessage('Erro ao fazer login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("@/assets/images/logo-login.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Login</Text>

            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu email"
                keyboardType="email-address"
                errorMessage={errorMessage}
            />
            <Input
                label="Senha"
                value={password}
                onChangeText={setPassword}
                placeholder="Digite sua senha"
                secureTextEntry
                errorMessage={errorMessage}
            />

            <Button title="Entrar" onPress={handleSignIn} loading={loading} />

            <View style={styles.separatorContainer}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>ou</Text>
                <View style={styles.line} />
            </View>

            <Pressable onPress={() => router.push('/register')}>
                <Text style={styles.registerLink}>Criar uma conta</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        alignSelf: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
        fontFamily: "Inter_700Bold",
        color: Colors.defaultTheme.tint,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    separatorText: {
        marginHorizontal: 10,
        color: '#999',
    },
    registerLink: {
        textAlign: 'center',
        color: Colors.defaultTheme.tint,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
