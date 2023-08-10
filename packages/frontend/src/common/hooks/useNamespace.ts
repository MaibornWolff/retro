import { useRouter } from "next/router";

export function useNamespace() {
  const { pathname } = useRouter();
  const pathName = pathname.slice(1);
  const endOfPathName = pathName.indexOf("/");

  return endOfPathName === -1 ? pathName : pathName.slice(0, endOfPathName);
}
