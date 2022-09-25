import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChooseFolderForm from './ChooseFolderForm';
import icon from './icon.png';

export default function PagesLayout() {
  const [path, setPath] = useState('')

  function changePath(path: string) {
    setPath(path)
  }

  return (
    <div>
      <div className='page-header'>
        <img src={icon} alt='' />
        <h2 className="card-title">Folder Info</h2>
      </div>

      <ChooseFolderForm changePath={changePath} />
      <Routes>
        <Route path='/info' element={<div />} />
      </Routes>
    </div>
  )
}
