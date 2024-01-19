import { usePathname } from "next/navigation";

export function useNamespace() {
  const pathname = usePathname();
  const pathName = pathname.slice(1);
  const endOfPathName = pathName.indexOf("/");

  return endOfPathName === -1 ? pathName : pathName.slice(0, endOfPathName);
}
