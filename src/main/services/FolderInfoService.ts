import { ipcMain } from "electron";
import { statSync } from "fs";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { FolderInfoChannel } from "../constants/constants";

export default function FolderInfoService() {

  ipcMain.on(FolderInfoChannel, async (event, args) => {
    let folderCount = 0
    let fileCount = 0
    let oldest5Files = new Array<oldFile>(5)
      .fill({
        name: "test",
        path: "test",
        date: new Date
      })

    let biggest5Files = new Array<bigFile>(5)
      .fill({
        name: "test",
        path: "test",
        size: 0
      })

    async function readDir(path: string) {
      const files = await readdir(path)

      // For reading in parallel
      const promiseArray = files.map( async file => {
        const fileStat = statSync(join(path, file))
        console.log("---- ", file, fileStat.isFile())
        if(!fileStat.isDirectory()) {
          fileCount++;

          function CompareDate() {
            const date = fileStat.birthtime;
            for(let i = 0; i < oldest5Files.length; i++) {
              const item = oldest5Files[i]
              if(date < item.date) {

                // Shifting the rest of the array to the right
                for(let j = oldest5Files.length - 1; j > i; j--) {
                  oldest5Files[j] = oldest5Files[j-1]
                }

                // THEN editing the targetted index element
                oldest5Files[i] = {
                  name: file,
                  path: join(path, file),
                  date: date
                }

                break;
              }
            }
          }

          function CompareSize() {
            const size = fileStat.size;
            for(let i = 0; i < biggest5Files.length; i++) {
              const item = biggest5Files[i]
              if(size > item.size) {

                // Shifting the rest of the array to the right
                for(let j = biggest5Files.length - 1; j > i; j--) {
                  biggest5Files[j] = biggest5Files[j-1]
                }

                // THEN editing the targetted index element
                biggest5Files[i] = {
                  name: file,
                  path: join(path, file),
                  size: size
                }

                break;
              }
            }
          }

          CompareDate()
          CompareSize()


        } else {
          folderCount++;
          await readDir(join(path, file))
        }
      })
      await Promise.all(promiseArray)

    }
    await readDir(args[0])

    console.log(oldest5Files)
    console.log(biggest5Files)

    event.reply(FolderInfoChannel, folderCount,  fileCount, oldest5Files, biggest5Files)

  })

}

type oldFile = {
  name: string,
  path: string,
  date: Date
}

type bigFile = {
  name: string,
  path: string,
  size: number
}
