import { NavLink } from "react-router-dom";

import logo from "../../assets/logos/logo_M2L.png";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const logOutApp = () => {
    localStorage.removeItem("userId");
    setUser("");
  };

  const navLinksVisiteurs = [
    { text: "Accueil", chemin: "/" },
    { text: "Salles", chemin: "/salles" },
    { text: "Produits", chemin: "/produits" }
  ];

  const navLinksLogged = [
    { text: "Accueil", chemin: "/" },
    { text: "Salles", chemin: "/salles" },
    { text: "Produits", chemin: "/produits" },
    { text: "Réservations", chemin: "/reservations" },
    { text: "Réunions", chemin: "/reunions" },
    { text: "Factures", chemin: "/factures" }
  ];

  if (user === "") {
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
          <NavLink className="nav_link" to="/logout" onClick={logOutApp}>Log Out</NavLink>
        </div>
      </nav>
    );
  }
};

export default Navbar;
