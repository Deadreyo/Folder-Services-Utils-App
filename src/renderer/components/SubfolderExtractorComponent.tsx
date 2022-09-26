import { SubfolderExtractorChannel } from "main/constants/constants"
import { useEffect, useState } from "react"

export default function SubfolderExtractorComponent({ changeAction }: SubfolderExtractorProps) {
  const [filesCount, setFilesCount] = useState<number | null>(null)
  const [resultPath, setResultPath] = useState('')

  const action = (path: string) => {
    window.electron.ipcRenderer.sendMessage(SubfolderExtractorChannel, [path])

    window.electron.ipcRenderer.once(SubfolderExtractorChannel, (filesCount) => {
      if(filesCount || filesCount === 0) {
        setFilesCount(filesCount as number)
        setResultPath(path+'\\extracted')
      }
    })

  }

  useEffect( () => {
    changeAction(action)
  }, [])

  if (filesCount === null) return null;

  return (
    <div className="page-inner-container">
      <div className="title-container">
        <h2>Files Extraction</h2>
      </div>

      <h3>Files extracted into {resultPath}</h3>

      <div className="table-container">
        <table className="table">
          <tbody>
            <tr>
              <th>Files Extracted</th>
              <td>{filesCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface SubfolderExtractorProps {
  changeAction: (action: (path: string) => void) => void
}
