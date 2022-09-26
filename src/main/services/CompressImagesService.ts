import { ipcMain } from 'electron';
import { statSync } from 'fs';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import { compressStatistic } from 'main/constants/types';
import path from 'path';
import { CompressImagesChannel } from '../constants/constants';

export default function CompressImagesService() {
  ipcMain.on(CompressImagesChannel, async (event, args) => {
    // because imagemin doesnt work with backward slashes '\'
    args[0] = path.normalize(args[0]).replaceAll('\\', '/');
    // "C:/Users/pc/OneDrive/Pictures/*.{jpg,png,jpeg}"
    console.log('path', args[0]);
    const files = await imagemin([`${args[0]}/*.{jpg,png,jpeg}`], {
      destination: `${args[0]}/compressed`,
      plugins: [
        imageminMozjpeg(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });

    const statistics: compressStatistic[] = files.map((file) => ({
      name: path.basename(file.sourcePath),
      before: (statSync(file.sourcePath).size / 1024).toLocaleString(),
      after: (statSync(file.destinationPath).size / 1024).toLocaleString(),
    }));

    console.log('before', statSync(files[0].sourcePath).size / 1024); // in KB
    console.log('after', statSync(files[0].destinationPath).size / 1024); // in KB

    event.reply(CompressImagesChannel, statistics);
  });
}
