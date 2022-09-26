import ChooseFolder from './ChooseFolder';
import CompressImagesService from './CompressImagesService';
import FolderInfoService from './FolderInfoService';

export default function InitializeServices() {
  ChooseFolder();
  FolderInfoService();
  CompressImagesService();
}
