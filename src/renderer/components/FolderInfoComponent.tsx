import { FolderInfoChannel } from "main/constants/constants"
import { useEffect, useState } from "react"

export default function FolderInfo({ changeAction }: FolderInfoProps) {
  const [data, setData] = useState<InfoData | null>(null)

  const action = (path: string) => {
    alert("sent")
    window.electron.ipcRenderer.sendMessage(FolderInfoChannel, [path])

    window.electron.ipcRenderer.once(FolderInfoChannel, (folderCount,  fileCount, oldest5Files, biggest5Files) => {
      console.log(oldest5Files)
    })

  }

  useEffect( () => {
    changeAction(action)
  }, [])

  // if (!data) return null;

  return (
    <div className="page-inner-container">
      <div className="title-container">
        <h2>Info</h2>
      </div>
    </div>
  )
}

interface FolderInfoProps {
  changeAction: (action: (path: string) => void) => void
}

interface InfoData {
  folderCount: number,
  fileCount: number
}
