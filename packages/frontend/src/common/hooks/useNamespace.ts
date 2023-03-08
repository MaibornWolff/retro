import { useLocation } from "react-router-dom";

export function useNamespace() {
  const location = useLocation();

  const pathname = location.pathname.slice(1);
  const endOfPathName = pathname.indexOf("/");

  return endOfPathName === -1 ? pathname : pathname.slice(0, endOfPathName);
}
