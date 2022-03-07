import './Reservations.css';
import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../../components/ItemList/ItemList";
import { useEffect, useState } from 'react';
import ButtonBasic from '../../components/ButtonBasic/ButtonBasic';
import GestionResa from '../GestionResa/GestionResa';

const Reservations = ({ user }) => {
    const [focus, setFocus] = useState();
    const productsKeys = ["nom", "description", "date_resa", 'gerer'];
    const productsHeader = ["Nom de la Salle", "Description", "Date", "Gérer"];
    const { response } = useAxios("get", `http://localhost:3001/users/${user.id}/reservations`, null)

    useEffect(() => {
        if (response) {
            response.success[0].forEach((resa, index) => {
                resa['date_resa'] = new Date(resa['date_resa']).toLocaleDateString();
                resa['gerer'] = <ButtonBasic handleClick={() => setFocus(resa)} buttonInnerText="Gérer"/>;
                // resa['id'] = index; // fake id, for keys in itemlist
            });
        }
    }, [response])


    if (focus) {
        return (
            <div className="gestionresa">
                <GestionResa reservation={focus} setFocus={setFocus}/>
            </div>
        )
    }

    return (
        <div id="resa-wrapper">
            <div id="resa-content">
                <h1>Vos prochaines réservations</h1>
                {response &&
                    <ItemList
                        name="reservations"
                        data={response.success[0]}
                        keys={productsKeys}
                        headers={productsHeader}
                    />}
            </div>
        </div>
    );
}

export default Reservations;