import { mkdirSync } from "fs";
import { join } from "path";

export let loggingStorage = join(process.cwd(), "storage", "logs");

export function autoInitPath(path: string) {
    mkdirSync(path);
}
