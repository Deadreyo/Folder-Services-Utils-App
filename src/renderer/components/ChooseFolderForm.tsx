import { ChooseFolderChannel } from 'main/constants/constants';
import { useState, MouseEventHandler } from 'react';

export default function ChooseFolderForm({ submitAction }: ChooseFolderProps) {
  const [path, setPath] = useState('');

  const onPathClick: MouseEventHandler = () => {
    window.electron.ipcRenderer.sendMessage(ChooseFolderChannel, ['hi']);
    window.electron.ipcRenderer.once(ChooseFolderChannel, (args) => {
      if (args instanceof Array && args.length > 0) {
        setPath(args[0]);
      } else {
        alert('Fail');
        console.log(args);
      }
    });
  };

  const onSubmit: MouseEventHandler = () => {
    if (path) {
      submitAction(path);
    } else {
      alert("Path can't be empty");
    }
  };

  return (
    <div>
      <form className="choose-file">
        <label htmlFor="submit">Choose Folder</label>
        <div className="chosen-file-div">
          <span>{path}</span>
          <button id="submit" type="button" onClick={onPathClick}>
            ...
          </button>
          <button type="button" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

interface ChooseFolderProps {
  submitAction: (path: string) => void;
}
