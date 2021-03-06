import { NavLink } from "react-router-dom";

import logo from "../../assets/logos/logo_M2L.png";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

// navLinksVisiteurs => liste d'objet pour la navbar visiteur
// navLinksLogged => liste d'objet pour la navbar visiteur connecté

const Navbar = () => {
  const { user, logout } = useAuth();
  // retire userId du localStorage + vide les données user
 
  const navLinksVisiteurs = [
    { text: "Accueil", chemin: "/" },
    { text: "Salles", chemin: "/salles" },
  ];
  
  const navLinksLogged = [
    { text: "Accueil", chemin: "/" },
    { text: "Salles", chemin: "/salles" },
    // { text: "Produits", chemin: "/produits" },
    { text: "Réservations", chemin: "/reservations" },
    { text: "Réunions", chemin: "/reunions" },
    { text: "Réclamations", chemin: "/complaint" },
  ];

  // ajout le link vers la page admin si user.is_admin === 1
  if (user && user.is_admin) navLinksLogged.push({ text: "Administration", chemin: "/cgv2" });

  // 2 rendu si le user est set ou pas
  if (!user || user === undefined || user === "undefined" || user === null) {
    return (
      <nav className="navbar">
        <NavLink to="/" className="logo">
          <img src={logo} alt="Logo Hair Prestige" />
        </NavLink>
        <div className="nav_list">
          <ul className="nav_menu" id="menu_navbar">
            {navLinksVisiteurs.map((navLink, index) => {
              return (
                <li className="nav_item" key={`link-${index}`}>
                  <NavLink className="nav_link" to={`${navLink.chemin}`}>
                    {`${navLink.text}`}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav_user">
          <NavLink className="nav_link" to="/signin">Inscription</NavLink>
          <NavLink className="nav_link" to="/login">Log In</NavLink>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <NavLink to="/" className="logo">
          <img src={logo} alt="Logo Hair Prestige" />
        </NavLink>
        <div className="nav_list">
          <ul className="nav_menu" id="menu_navbar">
            {navLinksLogged.map((navLink, index) => {
              return (
                <li className="nav_item" key={`link-${index}`}>
                  <NavLink className="nav_link" to={`${navLink.chemin}`}>
                    {`${navLink.text}`}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav_user">
          <NavLink className="nav_link" to="/compte">{`${user.prenom} ${user.nom}`}</NavLink>
          <a className="nav_link" onClick={logout}>Log Out</a>
        </div>
      </nav>
    );
  }
};

export default Navbar;

