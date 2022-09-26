import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ChooseFolderForm from './ChooseFolderForm';
import CompressImageComponent from './CompressImageComponent';
import FolderInfo from './FolderInfoComponent';
import icon from './icon.png';

export default function PagesLayout() {
  const [title, setTitle] = useState('Title')
  const [action, setAction] = useState<(path: string) => void>(() => () => {
    alert('f');
  });
  const location = useLocation()

  // Change the title of the page depending on the route location
  useEffect( () => {
    let val = 'Title'
    const loc = location.pathname
    switch (loc) {
      case '/info':
        val = 'Folder Info'
        break;
      case '/compress':
        val = 'Compress Images'
        break;
    }

    setTitle(val);
  }, [])

  function changeAction(func: (path: string) => void) {
    setAction(() => func);
  }

  return (
    <div>
      <div className="page-header">
        <img src={icon} alt="" />
        <h2 className="card-title">{title}</h2>
      </div>

      <div className="page-container">
        <ChooseFolderForm submitAction={action}/>
        <Routes>
          <Route
            path="/info"
            element={<FolderInfo changeAction={changeAction} />}
          />
          <Route
            path="/compress"
            element={<CompressImageComponent changeAction={changeAction} />}
          />
        </Routes>
      </div>
    </div>
  );
}
