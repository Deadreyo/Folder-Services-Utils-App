import ChooseFolder from './ChooseFolder';
import CompressImagesService from './CompressImagesService';
import FolderInfoService from './FolderInfoService';
import SearchInFolderService from './SearchInFolderService';

export default function InitializeServices() {
  ChooseFolder();
  FolderInfoService();
  CompressImagesService();
  SearchInFolderService();
}
