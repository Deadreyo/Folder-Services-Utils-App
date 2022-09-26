import { CompressImagesChannel } from "main/constants/constants"
import { compressStatistic } from "main/constants/types"
import { useEffect, useState } from "react"

export default function CompressImageComponent({ changeAction }: CompressImageProps) {
  const [statistics, setStatistics] = useState<compressStatistic[] | null>(null)
  const [resultPath, setResultPath] = useState('')
  const action = (path: string) => {
    alert("sent")
    window.electron.ipcRenderer.sendMessage(CompressImagesChannel, [path])

    window.electron.ipcRenderer.once(CompressImagesChannel, (statisticsArr) => {
      if(statisticsArr && statisticsArr instanceof Array && statisticsArr.length > 0) {
        setStatistics(statisticsArr as compressStatistic[])
        setResultPath(path+'\\compressed')
      } else {
        alert('Error occured.')
      }
    })

  }

  useEffect( () => {
    changeAction(action)
  }, [])

  if (!statistics) return null;

  return (
    <div className="page-inner-container">
      <div className="title-container">
        <h2>Statistics Report</h2>
      </div>

      <h3>Results output into {resultPath}</h3>
      
      <table>
        <caption>Statistics Report</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Before (KB)</th>
            <th>After (KB)</th>
          </tr>
        </thead>
        <tbody>
        {statistics.map( stat => (
          <tr key={stat.name}>
            <td>{stat.name}</td>
            <td>{stat.before}</td>
            <td>{stat.after}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

interface CompressImageProps {
  changeAction: (action: (path: string) => void) => void
}
