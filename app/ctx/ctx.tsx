import { useContext, createContext, PropsWithChildren, useEffect } from 'react';
import { useStorageState } from './useStorageState';

// Definindo a tipagem do contexto de autenticação
interface AuthContextType {
    signIn: (email: string, password: string) => Promise<void>; // Função para realizar o login
    signOut: () => void; // Função para realizar o logout
    session: string | null; // Sessão de autenticação (token ou null)
    isLoading: boolean; // Estado de carregamento da autenticação
}

// Criação do contexto com a tipagem definida
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

/**
 * Hook customizado para acessar os dados do AuthContext
 * @returns Objeto com métodos de login, logout e informações da sessão
 */
export function useSession() {
    return useContext(AuthContext); // Retorna o contexto de autenticação para consumo em outros componentes
}

/**
 * Provider do contexto de autenticação (AuthContext).
 * Este componente envolve a árvore de componentes, fornecendo as funções de autenticação
 * e o estado da sessão para todo o app.
 */
export function SessionProvider({ children }: PropsWithChildren) {
    // Usa o hook personalizado `useStorageState` para recuperar o estado de autenticação persistido
    const [[isLoading, session], setSession] = useStorageState('session');

    // useEffect(() => {
    //     // refresh token
    // }, [session]);

    const signIn = async (email: string, password: string) => { 
        // verificar se já existe um token
        if (session) {
            console.log('Já existe um token de autenticação.');
            return;
        }

        // chamar API de Login
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status !== 200) {
            console.log('Erro ao fazer login:', data.message);
            return;
        }

        setSession(data.accessToken);
    }

    const signOut = () => {
        setSession(null); // Limpa o estado da sessão
    }

    const signUp = async (email: string, password: string) => {};

    return (
        <AuthContext.Provider
            value={{
                // Função de login simulado: aqui você poderia integrar com uma API de autenticação
                signIn, // Substituir 'dummy-token' por um token real
                // Função de logout: limpa o estado da sessão
                signOut,
                session, // Sessão atual (token de autenticação, por exemplo)
                isLoading, // Indica se os dados da sessão estão sendo carregados
            }}
        >
            {children} {/* Renderiza os filhos do componente provider */}
        </AuthContext.Provider>
    );
}
