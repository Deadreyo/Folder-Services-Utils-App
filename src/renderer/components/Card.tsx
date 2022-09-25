import { Link } from "react-router-dom";

export default function Card({ icon, link, title }: CardProps) {

  return (
    <div className="card">
      <Link to={link}>
        <img src={icon} alt={title+" image"} />
        <h2 className="card-title">{title}</h2>
      </Link>
    </div>
  )
}

interface CardProps {
  icon: string,
  link: string,
  title: string
}
