import { ChooseFolderChannel } from 'main/constants/constants';
import { MouseEventHandler, useRef, useState } from 'react';
import ChooseFolderForm from './ChooseFolderForm';
import icon from './icon.png';

export default function Page() {
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
    </div>
  )
}
