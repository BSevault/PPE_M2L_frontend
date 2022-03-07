import { useEffect, useState } from "react";
import './GestionResa.css';

const GestionResa = ({ reservation }) => {

    const [resaKeys, setResaKeys] = useState();
    
    useEffect(() => {
        if (reservation) setResaKeys(Object.keys(reservation))
    }, [reservation]);

    return (
        <div className="gestion-resa">
            <ul className="test">
                {
                    resaKeys?.map((key, index) => (
                        <li key={`resa-${index}`}>{reservation[key]}</li>
                ))
                }
            </ul>
        </div>
    );
}

export default GestionResa;