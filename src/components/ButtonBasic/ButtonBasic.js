import './ButtonBasic.css';

const ButtonBasic = ({ handleClick, buttonInnerText, style }) => {
    return ( 
        <button className="button-basic" onClick={handleClick} style={style}>
            <p>{buttonInnerText}</p>
        </button>
     );
}
 
export default ButtonBasic;