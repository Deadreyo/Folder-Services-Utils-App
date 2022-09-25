import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChooseFolderForm from './ChooseFolderForm';
import FolderInfo from './FolderInfoComponent';
import icon from './icon.png';

export default function PagesLayout() {
  const [path, setPath] = useState('')
  const [action, setAction] = useState<(path: string) => void>( () => () => {alert("f")})

  function changePath(path: string) {
    setPath(path)
  }

  function changeAction(func: (path: string) => void) {
    setAction( () => func)
  }

  return (
    <div>
      <div className='page-header'>
        <img src={icon} alt='' />
        <h2 className="card-title">Folder Info</h2>
      </div>

      <div className='page-container'>
      <ChooseFolderForm changePath={changePath} submitAction={action} />
      <Routes>
        <Route path='/info' element={<FolderInfo changeAction={changeAction} />} />
      </Routes>
      </div>
    </div>
  )
}
