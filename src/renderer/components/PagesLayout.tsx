import { ipcRenderer } from 'electron';
import { ChooseFolderChannel } from 'main/constants/constants';
import { MouseEventHandler, useRef, useState } from 'react';
import icon from './icon.png';

export default function Page() {
  const [path, setPath] = useState('')

  const onClick: MouseEventHandler = (e) => {
    window.electron.ipcRenderer.sendMessage(ChooseFolderChannel, ["hi"])
    // Electron.ipcRenderer.send(ChooseFolderChannel, ['ping'])
    window.electron.ipcRenderer.once(ChooseFolderChannel, (args) => {
      if(args instanceof Array && args.length > 0) {
        alert('Success!')
        setPath(args[0])
      } else {
        alert("Fail")
        console.log(args)
      }
    })
  }

  return (
    <div>
      <div className='page-header'>
        <img src={icon} alt='' />
        <h2 className="card-title">Folder Info</h2>
      </div>

      <div>
        <form className='choose-file'>
          <label htmlFor="submit">Choose Folder</label>
          <div className='chosen-file-div'>
            <span>{path}</span>
            <button id="submit" type='button' onClick={onClick}>...</button>
          </div>
        </form>
      </div>
    </div>
  )
}
