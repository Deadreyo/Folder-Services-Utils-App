import { Link } from 'react-router-dom';
import icon from './icon.png';

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="row">
        <div className="card">
          <Link to="/">
            <img src={icon} alt="" />
          </Link>
        </div>
        <div className="card">
          <Link to="/">
            <img src={icon} alt="" />
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <Link to="/">
            <img src={icon} alt="" />
          </Link>
        </div>
        <div className="card">
          <Link to="/">
            <img src={icon} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}
