import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChooseFolderForm from '../components/ChooseFolderForm';
import defaultIcon from '../assets/icon.png';
import pagesMetadata from 'renderer/utils/pagesMetadata';

interface PagesLayoutProps {
  Component: PageComponentFC;
}

export default function PagesLayout({
  Component
}: PagesLayoutProps) {
  const [title, setTitle] = useState('Title');
  const [icon, setIcon] = useState(defaultIcon);
  const [description, setDescription] = useState('Change the title of the page depending on the route location');
  const [action, setAction] = useState<(path: string) => void>(() => () => {});
  const location = useLocation();

  // Change the title & data of the page depending on the route location
  useEffect(() => {
    let metadata = pagesMetadata[location.pathname];

    if(metadata) {
      setTitle(metadata.text);
      setIcon(metadata.icon);
      setDescription(metadata.desc);
    }
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
        <Component changeAction={changeAction} />
      </div>
    </div>
  );
}
