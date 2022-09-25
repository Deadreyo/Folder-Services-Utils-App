import { dialog, ipcMain } from 'electron';
import { ChooseFolderChannel } from '../constants/constants';

export default function ChooseFolder() {
  ipcMain.on(ChooseFolderChannel, async (event, _args) => {
    const path = await dialog.showOpenDialog({
      properties: ['openDirectory', 'showHiddenFiles'],
    });

    event.reply(ChooseFolderChannel, path.filePaths);
  });
}
