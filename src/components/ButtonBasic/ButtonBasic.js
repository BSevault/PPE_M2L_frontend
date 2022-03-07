import './ButtonBasic.css';

const ButtonBasic = ({ handleClick, buttonInnerText }) => {
    return ( 
        <button className="button-basic" onClick={handleClick}>
            <p>{buttonInnerText}</p>
        </button>
     );
}
 
export default ButtonBasic;