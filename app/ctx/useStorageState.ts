import { useEffect, useReducer } from "react";
import * as SecureStore from "expo-secure-store";

// Detecta se está no navegador (web)
const isWeb = typeof window !== "undefined";

/**
 * Hook personalizado que gerencia estado persistente com SecureStore ou localStorage.
 * @param key A chave do valor persistido.
 * @returns [estado, setStatePersistente]
 */
export function useStorageState(key: string) {
    const [state, setState] = useReducer(
        (_: [boolean, string | null], action: string | null): [boolean, string | null] => [false, action],
        [true, null]
    );

    // Carrega o valor da storage assim que o hook for montado
    useEffect(() => {
        const fetch = async () => {
            try {
                let value: string | null;

                if (isWeb) {
                    value = window.localStorage.getItem(key);
                } else {
                    value = await SecureStore.getItemAsync(key);
                }

                setState(value ?? null);
            } catch (error) {
                console.error("Erro ao carregar do storage:", error);
                setState(null); // fallback se der erro
            }
        };

        fetch();
    }, [key]);

    // Setter do valor persistido
    const setValue = (value: string | null) => {
        try {
            if (isWeb) {
                if (value === null) {
                    window.localStorage.removeItem(key);
                } else {
                    window.localStorage.setItem(key, value);
                }
            } else {
                if (value === null) {
                    SecureStore.deleteItemAsync(key);
                } else {
                    SecureStore.setItemAsync(key, value);
                }
            }

            setState(value);
        } catch (error) {
            console.error("Erro ao salvar no storage:", error);
        }
    };

    return [state, setValue] as const; // [ [isLoading, value], setValue ]
}
