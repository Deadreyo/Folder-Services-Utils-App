import { ipcMain } from 'electron';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import { CompressImagesChannel } from '../constants/constants';

export default function CompressImagesService() {
  ipcMain.on(CompressImagesChannel, async (event, args) => {

    //"C:/Users/pc/OneDrive/Pictures/*.{jpg,png,jpeg}"
    const files = await imagemin([`${args[0]}/*.{jpg,png,jpeg}`], {
      destination: `${args[0]}`,
      plugins: [
        imageminMozjpeg(),
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });

    event.reply(
      CompressImagesChannel
    );
  });
}
