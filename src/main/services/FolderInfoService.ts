import { ipcMain } from 'electron';
import { statSync } from 'fs';
import { readdir } from 'fs/promises';
import { oldFile, bigFile } from 'main/constants/types';
import { join } from 'path';
import { FolderInfoChannel } from '../constants/constants';

export default function FolderInfoService() {
  ipcMain.on(FolderInfoChannel, async (event, args) => {
    let folderCount = 0;
    let fileCount = 0;
    let oldest5Files = new Array<oldFile>(5).fill({
      name: 'test',
      path: 'test',
      date: new Date(),
    });

    let biggest5Files = new Array<bigFile>(5).fill({
      name: 'test',
      path: 'test',
      size: 0,
    });

    async function readDir(path: string) {
      const files = await readdir(path);

      // For reading in parallel
      const promiseArray = files.map(async (file) => {
        const fileStat = statSync(join(path, file));
        if (!fileStat.isDirectory()) {
          fileCount++;

          function CompareDate() {
            const date = fileStat.birthtime;
            for (let i = 0; i < oldest5Files.length; i++) {
              const item = oldest5Files[i];
              if (date < item.date) {
                // Shifting the rest of the array to the right
                for (let j = oldest5Files.length - 1; j > i; j--) {
                  oldest5Files[j] = oldest5Files[j - 1];
                }

                // THEN editing the targetted index element
                oldest5Files[i] = {
                  name: file,
                  path: join(path, file),
                  date,
                };

                break;
              }
            }
          }

          function CompareSize() {
            const size = fileStat.size / (1024 * 1024);
            for (let i = 0; i < biggest5Files.length; i++) {
              const item = biggest5Files[i];
              if (size > item.size) {
                // Shifting the rest of the array to the right
                for (let j = biggest5Files.length - 1; j > i; j--) {
                  biggest5Files[j] = biggest5Files[j - 1];
                }

                // THEN editing the targetted index element
                biggest5Files[i] = {
                  name: file,
                  path: join(path, file),
                  size, // from bytes to MB
                };

                break;
              }
            }
          }

          CompareDate();
          CompareSize();
        } else {
          folderCount++;
          await readDir(join(path, file));
        }
      });
      await Promise.all(promiseArray);
    }
    await readDir(args[0]);

    oldest5Files = oldest5Files.filter((val) => val.name !== 'test');
    biggest5Files = biggest5Files.filter((val) => val.name !== 'test');

    console.log(oldest5Files);
    console.log(biggest5Files);

    event.reply(
      FolderInfoChannel,
      folderCount,
      fileCount,
      oldest5Files,
      biggest5Files
    );
  });
}
