import { useRouter } from "next/navigation";
import { useNamespace } from "./useNamespace";

export function useRedirect() {
  const { push } = useRouter();
  const namespace = useNamespace();

  function redirectBackToHome() {
    push("/");
  }

  function redirectToRoom(roomId?: string) {
    push(`/${namespace}/${roomId ?? ""}`);
  }

  return { redirectBackToHome, redirectToRoom };
}
