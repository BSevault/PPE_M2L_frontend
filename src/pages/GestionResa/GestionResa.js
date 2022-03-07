import { useEffect, useState } from "react";
import ButtonBasic from "../../components/ButtonBasic/ButtonBasic";
import './GestionResa.css';

const GestionResa = ({ reservation, setFocus }) => {
    // const [resaKeys, setResaKeys] = useState();
    // useEffect(() => {
    //     if (reservation) setResaKeys(Object.keys(reservation))
    // }, [reservation]);

    console.log(reservation);


    

    return (
        <div className="gestion-resa">
            <div className="return-resa">
                <ButtonBasic handleClick={() => setFocus()} buttonInnerText="Revenir à mes réservations" />
            </div>
            <ul className="test">
                <p>id réservation: {reservation.id}</p>
            </ul>
        </div>
    );
}

export default GestionResa;