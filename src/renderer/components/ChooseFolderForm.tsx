import { ChooseFolderChannel } from "main/constants/constants"
import { useState, MouseEventHandler } from "react"

export default function ChooseFolderForm({ changePath }: ChooseFolderProps) {
  const [path, setPath] = useState('')

  const onClick: MouseEventHandler = () => {
    window.electron.ipcRenderer.sendMessage(ChooseFolderChannel, ["hi"])
    // Electron.ipcRenderer.send(ChooseFolderChannel, ['ping'])
    window.electron.ipcRenderer.once(ChooseFolderChannel, (args) => {
      if(args instanceof Array && args.length > 0) {
        alert('Success!')
        setPath(args[0])
        changePath(args[0])
      } else {
        alert("Fail")
        console.log(args)
      }
    })
  }

  return (

    <div>
      <form className='choose-file'>
        <label htmlFor="submit">Choose Folder</label>
        <div className='chosen-file-div'>
          <span>{path}</span>
          <button id="submit" type='button' onClick={onClick}>...</button>
        </div>
      </form>
    </div>

  )
}

interface ChooseFolderProps {
  changePath: (path: string) => void
}
