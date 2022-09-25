import { useRef } from 'react';
import icon from './icon.png';

export default function Page() {

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
            <span>F://abcd/bbc/exp</span>
            <button id="submit" type='button'>...</button>
          </div>
        </form>
      </div>
    </div>
  )
}
