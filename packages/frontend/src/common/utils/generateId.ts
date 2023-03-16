import { customAlphabet } from "nanoid";

export function generateId() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const nanoId = customAlphabet(alphabet); // nanoId alphabet without special chars
  return nanoId();
}
