import { useConfigurationContext } from "../context/ConfigurationContext";
import { BrowserLogger } from "@shared/logger/dist/browserLogger";

export function useLogger() {
  const { logLevel } = useConfigurationContext();
  return new BrowserLogger({ level: logLevel });
}
