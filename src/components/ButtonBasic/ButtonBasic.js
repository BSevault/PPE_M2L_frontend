import './ButtonBasic.css';

const ButtonBasic = ({ handleClick, buttonInnerText, style, colorstyle }) => {
    var color = '';
    if (colorstyle) color = colorstyle;


    return ( 
        <button className={`button-basic${color}`} onClick={handleClick} style={style}>
            <p>{buttonInnerText}</p>
        </button>
     );
}
 
export default ButtonBasic;