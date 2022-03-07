import './ButtonBasic.css';

const ButtonBasic = ({ handleClick }) => {
    return ( 
        <button className="button-basic" onClick={handleClick}>
            <p>Gérer</p>
        </button>
     );
}
 
export default ButtonBasic;