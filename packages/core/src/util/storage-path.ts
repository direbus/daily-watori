import { mkdirSync } from 'fs';
import { join } from 'path';

export const loggingStorage = join(process.cwd(), 'storage', 'logs');

export function autoInitPath(path: string) {
  mkdirSync(path);
}
