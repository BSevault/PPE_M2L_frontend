import { Link } from "react-router-dom";
import "./Footer.css"
// import pres from "../../assets/docs/Presentation_M2L.pdf"

const Footer = () => {
    return (
        <ul id="footer">
            <li id="adress">
                <h3>Maison des Ligues de Lorraine</h3>
                <p>12 avenue de Lorraine, 57000 METZ</p>
            </li>
            <li id="presentation">
                <Link to="/presentation"><h3> Présentation des locaux</h3></Link>
            </li>
            <li id="contact">
                <Link to="/contact"><h3> Contact</h3></Link>
            </li>
            <li id="legals">
                <Link to="/legals"><h3>Mentions légales</h3></Link>
                <Link to="/cgv"><h3>CGV / CGU</h3></Link>
            </li>
        </ul>
    );
};

export default Footer;


