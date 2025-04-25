import { useEffect } from "react";
import SplashScreen from "./components/ui/SplashScreen";
import { useRouter } from "expo-router";
import { useSession } from "./ctx/ctx"; // supondo que você tenha o contexto de sessão

export default function Index() {
  const router = useRouter();
  const { session } = useSession(); // acesso ao token

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (session) {
        router.replace("/todo");
      } else {
        router.replace("/sign-in");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [session]);

  return <SplashScreen />;
}
