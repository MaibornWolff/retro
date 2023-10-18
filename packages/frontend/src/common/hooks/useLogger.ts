import { useConfigurationContext } from "../context/ConfigurationContext";
import { BrowserLogger } from "@shared/browserlogger";

export function useLogger() {
  const { logLevel } = useConfigurationContext();
  return new BrowserLogger({ level: logLevel });
}
