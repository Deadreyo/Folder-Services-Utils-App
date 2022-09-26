import { ipcMain } from 'electron';
import { statSync } from 'fs';
import { readdir } from 'fs/promises';
import { basename, extname, join } from 'path';
import { SearchFolderChannel } from '../constants/constants';

export default function FolderInfoService() {
  ipcMain.on(SearchFolderChannel, async (event, args) => {

    const pathArrays: string[] = []
    const extSearch = ['.png', '.jpg', '.jpeg', '.gif']

    async function readDir(path: string) {
      const files = await readdir(path);

      // For reading in parallel
      const promiseArray = files.map(async (file) => {
        const newPath = join(path, file)
        const fileStat = statSync(newPath);

        if (!fileStat.isDirectory()) {
          const ext = extname(newPath)
          if(extSearch.some( val => val === ext)) {
            pathArrays.push(newPath)
          }

        } else {
          await readDir(newPath);
        }
      });
      await Promise.all(promiseArray);
    }
    await readDir(args[0]);

    const data = pathArrays.map( path => (
      {
        name: basename(path),
        path,

      }
    ))

    event.reply(
      SearchFolderChannel,
      data
    );
  });
}
