import { SearchFolderChannel } from "main/constants/constants"
import { searchFile } from "main/constants/types"
import { useEffect, useState } from "react"

export default function SearchInFolderComponent({ changeAction }: SearchInFolderProps) {
  const [files, setFiles] = useState<searchFile[] | null>(null)

  const action = (path: string) => {
    window.electron.ipcRenderer.sendMessage(SearchFolderChannel, [path])

    window.electron.ipcRenderer.once(SearchFolderChannel, (foundFiles) => {
      if(foundFiles && foundFiles instanceof Array && foundFiles.length > 0) {
        setFiles(foundFiles as searchFile[])
      } else {
        alert('Error occured.')
      }
    })

  }

  useEffect( () => {
    changeAction(action)
  }, [])

  if (!files) return null;

  return (
    <div className="page-inner-container">
      <div className="title-container">
        <h2>Files Found</h2>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
          {files.map( file => (
            <tr key={file.path}>
              <td>{file.name}</td>
              <td>{file.path}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface SearchInFolderProps {
  changeAction: (action: (path: string) => void) => void
}
