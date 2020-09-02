import chalk from "chalk";
import { remove } from "rmby";

const REGULAR_THRESHOLD = 604800; // one week
const PUBLIC_THRESHOLD = 21600; // six hours
const THRESHOLD = process.env.RETRO_PUBLIC
  ? PUBLIC_THRESHOLD
  : REGULAR_THRESHOLD;

export async function cleanStorage(storagePath: string): Promise<void> {
  const deletedJSON = await remove()
    .from(storagePath)
    .byTime()
    .olderThan(THRESHOLD)
    .seconds()
    .and()
    .byExtension(".json")
    .run();

  const deletedPNG = await remove()
    .from(storagePath)
    .byTime()
    .olderThan(THRESHOLD)
    .seconds()
    .and()
    .byExtension(".png")
    .run();

  printResults(deletedJSON);
  printResults(deletedPNG);
}

function printResults(deletedFiles: string[]): void {
  console.log(chalk`{blue.bold [INFO] Storage clean up results:}`);
  deletedFiles.forEach((file) => console.log(file));
}
