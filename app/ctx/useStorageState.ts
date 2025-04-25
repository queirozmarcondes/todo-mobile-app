import { useEffect, useReducer } from "react";
import * as SecureStore from "expo-secure-store";

const isWeb = typeof window !== "undefined";

type StorageState = [boolean, string | null]; // [isLoading, value]

export function useStorageState(key: string) {
  const [state, setState] = useReducer(
    (_: StorageState, action: string | null): StorageState => [false, action],
    [true, null]
  );

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
        setState(null);
      }
    };

    fetch();
  }, [key]);

  const setValue = async (value: string | null) => {
    try {
      if (isWeb) {
        if (value === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, value);
        }
      } else {
        if (value === null) {
          await SecureStore.deleteItemAsync(key);
        } else {
          await SecureStore.setItemAsync(key, value);
        }
      }

      setState(value);
    } catch (error) {
      console.error("Erro ao salvar no storage:", error);
    }
  };

  return [state, setValue] as const;
}
