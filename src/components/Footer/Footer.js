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
                <a href="../../assets/docs/Presentation_M2L.pdf" >
                   <h3> Présentation des locaux</h3>
                </a>
            </li>
            <li id="legals">
                <Link to="/legals"><h3>Mentions légales</h3></Link>
            </li>
        </ul>
    );
};

export default Footer;


