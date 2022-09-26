import { ipcMain } from 'electron';
import { mkdirSync, statSync } from 'fs';
import { copyFile, readdir } from 'fs/promises';
import path, { join } from 'path';
import { SubfolderExtractorChannel } from '../constants/constants';

export default function SubfolderExtractorService() {
  ipcMain.on(SubfolderExtractorChannel, async (event, args) => {

    let filesCount = 0
    const dirPath = path.join(args[0], 'extracted')
    mkdirSync(dirPath, { recursive: true})
    console.log("mkdir")

    async function readDir(path: string) {
      const files = await readdir(path);

      // For reading in parallel
      const promiseArray = files.map(async (file) => {
        const srcPath = join(path, file)
        const fileStat = statSync(srcPath);

        if (!fileStat.isDirectory()) {
          filesCount++;
          await copyFile(srcPath, join(dirPath,file))
        } else {
          await readDir(srcPath);
        }
      });
      await Promise.all(promiseArray);
    }
    await readDir(args[0]);
    console.log("extracted", filesCount)

    event.reply(
      SubfolderExtractorChannel,
      filesCount
    );
  });
}
