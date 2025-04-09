import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { useState } from 'react';
import { router } from 'expo-router';
import { Colors } from './constants/Colors';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setErrorMessage('Preencha todos os campos!');
            return;
        }

        setErrorMessage(null);
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // simula chamada API
            // Aqui você enviaria os dados para sua API
            router.replace('/sign-in');
        } catch (error) {
            setErrorMessage('Erro ao criar conta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar conta</Text>

            <Input
                label="Nome"
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome"
                errorMessage={errorMessage}
            />
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

            <Button title="Cadastrar" onPress={handleRegister} loading={loading} />

            <View style={styles.separatorContainer}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>ou</Text>
                <View style={styles.line} />
            </View>

            <Pressable onPress={() => router.push('/sign-in')}>
                <Text style={styles.registerLink}>
                    Já está cadastrado? Toque aqui para logar!
                </Text>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
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
