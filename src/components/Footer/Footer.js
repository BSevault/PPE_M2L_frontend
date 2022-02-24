import { Link } from "react-router-dom";
import pres from "../../assets/docs/Presentation_M2L.pdf"

const Footer = () => {
    return (
        <div id="footer">
            <div id="adress">
                <h2>Maison des Ligues de Lorraine</h2>
                <p>12 avenue de Lorraine, 57000 METZ</p>
            </div>
            <div className="about-us">
                <Link to= { pres }>
                    Qui sommes-nous
                </Link>
            </div>
            <div className="legals">
                <Link to="/legals">Mentions légales</Link>
            </div>
        </div>
    );
};

export default Footer;


