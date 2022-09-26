import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ChooseFolderForm from './ChooseFolderForm';
import CompressImageComponent from './CompressImageComponent';
import FolderInfo from './FolderInfoComponent';
import SearchInFolderComponent from './SearchInFolderComponent';
import infoIcon from '../assets/info.png';
import searchIcon from '../assets/search.png';
import compressIcon from '../assets/data-compression.png';
import bundleIcon from '../assets/data-collection.png';
import defaultIcon from '../assets/icon.png';
import SubfolderExtractorComponent from './SubfolderExtractorComponent';

export default function PagesLayout() {
  const [title, setTitle] = useState('Title');
  const [icon, setIcon] = useState(defaultIcon);
  const [description, setDescription] = useState(
    'Change the title of the page depending on the route location'
  );
  const [action, setAction] = useState<(path: string) => void>(() => () => {
    alert('f');
  });
  const location = useLocation();

  // Change the title of the page depending on the route location
  useEffect(() => {
    let text = 'Title';
    let icon = '';
    let desc = '';
    const loc = location.pathname;
    switch (loc) {
      case '/info':
        text = 'Folder Info';
        icon = infoIcon;
        desc =
          'Gets information about this folder and the biggest and oldest files nested within.';
        break;
      case '/compress':
        text = 'Compress Images';
        icon = compressIcon;
        desc =
          'Compresses all images inside this folder and put them in a new folder. Does not dive into subfolders';
        break;
      case '/search':
        text = 'Deep Image Search';
        icon = searchIcon;
        desc =
          'Searches for and shows all images nested inside this folder. Dives into subfolders.';
        break;
      case '/bundle':
        text = 'Subfolders Extractor';
        icon = bundleIcon;
        desc =
          'Extracts all files from the subfolders and puts them all together in a new folder.';
        break;
    }

    setTitle(text);
    setIcon(icon);
    setDescription(desc);
  }, []);

  function changeAction(func: (path: string) => void) {
    setAction(() => func);
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-center">
          <img src={icon} alt="" />
          <h2 className="card-title">{title}</h2>
        </div>
        <p>{description}</p>
      </div>

      <div className="page-container">
        <ChooseFolderForm submitAction={action} />
        <Routes>
          <Route
            path="/info"
            element={<FolderInfo changeAction={changeAction} />}
          />
          <Route
            path="/compress"
            element={<CompressImageComponent changeAction={changeAction} />}
          />
          <Route
            path="/search"
            element={<SearchInFolderComponent changeAction={changeAction} />}
          />
          <Route
            path="/bundle"
            element={
              <SubfolderExtractorComponent changeAction={changeAction} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
