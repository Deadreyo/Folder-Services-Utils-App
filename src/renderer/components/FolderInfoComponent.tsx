import { FolderInfoChannel } from "main/constants/constants"
import { bigFile, oldFile } from "main/constants/types"
import { useEffect, useState } from "react"

export default function FolderInfo({ changeAction }: FolderInfoProps) {
  const [data, setData] = useState<InfoData | null>(null)

  const action = (path: string) => {
    window.electron.ipcRenderer.sendMessage(FolderInfoChannel, [path])

    window.electron.ipcRenderer.once(FolderInfoChannel, (folderCount,  fileCount, oldest5Files, biggest5Files) => {
      const obj: InfoData = {
        folderCount: folderCount as number,
        fileCount: fileCount as number,
        oldest5Files: oldest5Files as oldFile[],
        biggest5Files: biggest5Files as bigFile[]
      }

      setData(obj);
    })

  }

  useEffect( () => {
    changeAction(action)
  }, [])

  if (!data) return null;

  return (
    <div className="page-inner-container">
      <div className="title-container">
        <h2>Info</h2>
      </div>

      <table>
        <tr>
          <th>File Count:</th>
          <td>{data.fileCount}</td>
        </tr>
        <tr>
          <th>Folder Count:</th>
          <td>{data.folderCount}</td>
        </tr>
      </table>

      <table>
        <caption>Biggest Files</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Path</th>
            <th>Size (MB)</th>
          </tr>
        </thead>
        <tbody>
        {data.biggest5Files.map( file => (
          <tr key={file.path}>
            <td>{file.name}</td>
            <td>{file.path}</td>
            <td>{file.size.toLocaleString()}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <table>
        <tr>
          <th>File Count:</th>
          <td>{data.fileCount}</td>
        </tr>
        <tr>
          <th>Folder Count:</th>
          <td>{data.folderCount}</td>
        </tr>
      </table>

      <table>
        <caption>Oldest Files</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Path</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {data.oldest5Files.map( file => (
          <tr key={file.path}>
            <td>{file.name}</td>
            <td>{file.path}</td>
            <td>{file.date.toLocaleString()}</td>
          </tr>
        ))}
        </tbody>
      </table>


    </div>
  )
}

interface FolderInfoProps {
  changeAction: (action: (path: string) => void) => void
}

interface InfoData {
  folderCount: number,
  fileCount: number,
  oldest5Files: oldFile[],
  biggest5Files: bigFile[]
}
