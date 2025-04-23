import { useEffect } from "react";
import SplashScreen from "./components/ui/SplashScreen";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
<<<<<<< HEAD
      router.replace("/todo"); // navega para login e remove a splash da pilha
=======
      router.replace("/sign-in"); // navega para login e remove a splash da pilha
>>>>>>> 6fc16853cbe977de184532eaa47db98b164a8511
    }, 2000); // tempo em ms (2 segundos)

    return () => clearTimeout(timeout);
  }, []);

  return <SplashScreen />;
}
