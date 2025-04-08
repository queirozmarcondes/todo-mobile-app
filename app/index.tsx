import { useEffect } from "react";
import SplashScreen from "./components/ui/SplashScreen";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/login"); // navega para login e remove a splash da pilha
    }, 2000); // tempo em ms (2 segundos)

    return () => clearTimeout(timeout);
  }, []);

  return <SplashScreen />;
}
