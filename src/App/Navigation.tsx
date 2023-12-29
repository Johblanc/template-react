import { Link } from "react-router-dom";

export function Navigation () {
  
  return (
    <nav>
      <details open>
        <summary>Utilisateurs</summary>
        <ul>
          <li><Link to={"/users/profile"}> Mon Profile</Link></li>
          <li><Link to={"/users"}> Tous les utilisateurs</Link></li>
        </ul>
      </details>
    </nav>
  )
}