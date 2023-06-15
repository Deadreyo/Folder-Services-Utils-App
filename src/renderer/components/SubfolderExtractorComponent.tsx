import { SubfolderExtractorChannel } from 'main/constants/constants';
import { useEffect, useState } from 'react';

const SubfolderExtractorComponent: PageComponentFC = ({ changeAction }) => {
  const [filesCount, setFilesCount] = useState<number | null>(null);
  const [resultPath, setResultPath] = useState('');

  const action = (path: string) => {
    window.electron.ipcRenderer.sendMessage(SubfolderExtractorChannel, [path]);

    window.electron.ipcRenderer.once(
      SubfolderExtractorChannel,
      (incFilesCount) => {
        if (incFilesCount || incFilesCount === 0) {
          setFilesCount(incFilesCount as number);
          setResultPath(`${path}\\extracted`);
        }
      }
    );
  };

  useEffect(() => {
    changeAction(action);
  }, []);

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
  );
};

export default SubfolderExtractorComponent;
