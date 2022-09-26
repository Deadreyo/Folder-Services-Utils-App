import ChooseFolder from './ChooseFolder';
import CompressImagesService from './CompressImagesService';
import FolderInfoService from './FolderInfoService';
import SearchInFolderService from './SearchInFolderService';
import SubfolderExtractorService from './SubfolderExtractorService';

export default function InitializeServices() {
  ChooseFolder();
  FolderInfoService();
  CompressImagesService();
  SearchInFolderService();
  SubfolderExtractorService();
}
