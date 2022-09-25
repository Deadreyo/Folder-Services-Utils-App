import Card from './Card';
import icon from './icon.png';

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="row">
        <Card icon={icon} link="/" title='Card Title' />
        <Card icon={icon} link="/" title='Card Title' />
      </div>
      <div className="row">
        <Card icon={icon} link="/" title='Card Title' />
        <Card icon={icon} link="/" title='Card Title' />
      </div>
    </div>
  );
}
