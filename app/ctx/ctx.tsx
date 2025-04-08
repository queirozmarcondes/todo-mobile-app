import { useContext, createContext, PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';

// Definindo a tipagem do contexto de autenticação
interface AuthContextType {
    signIn: () => void; // Função para realizar o login
    signOut: () => void; // Função para realizar o logout
    session: string | null; // Sessão de autenticação (token ou null)
    isLoading: boolean; // Estado de carregamento da autenticação
}

// Criação do contexto com a tipagem definida
const AuthContext = createContext<AuthContextType>({
    signIn: () => { },
    signOut: () => { },
    session: null,
    isLoading: true,
});

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

    return (
        <AuthContext.Provider
            value={{
                // Função de login simulado: aqui você poderia integrar com uma API de autenticação
                signIn: () => setSession('dummy-token'), // Substituir 'dummy-token' por um token real
                // Função de logout: limpa o estado da sessão
                signOut: () => setSession(null),
                session, // Sessão atual (token de autenticação, por exemplo)
                isLoading, // Indica se os dados da sessão estão sendo carregados
            }}
        >
            {children} {/* Renderiza os filhos do componente provider */}
        </AuthContext.Provider>
    );
}
