import Card from '../components/Card';
import infoIcon from '../assets/info.png';
import searchIcon from '../assets/search.png';
import compressIcon from '../assets/data-compression.png';
import bundleIcon from '../assets/data-collection.png';

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="row">
        <Card icon={infoIcon} link="/info" title="Folder Info" />
        <Card icon={searchIcon} link="/search" title="Search in Folder" />
      </div>
      <div className="row">
        <Card icon={compressIcon} link="/compress" title="Compress Images" />
        <Card icon={bundleIcon} link="/bundle" title="Subfolders Extractor" />
      </div>
    </div>
  );
}
