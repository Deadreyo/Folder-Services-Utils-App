import Card from './Card';
import icon from './icon.png';

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="row">
        <Card icon={icon} link="/info" title="Folder Info" />
        <Card icon={icon} link="/" title="Search in Folder" />
      </div>
      <div className="row">
        <Card icon={icon} link="/" title="Compress Images" />
        <Card icon={icon} link="/" title="Folder Content Renamer" />
      </div>
    </div>
  );
}
