import './Reservations.css';
import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../../components/ItemList/ItemList";
import { useEffect, useState } from 'react';
import ButtonBasic from '../../components/ButtonBasic/ButtonBasic';
import GestionResa from '../GestionResa/GestionResa';
import { useAuth } from '../../components/contexts/AuthContext';

const Reservations = () => {
    const { user } = useAuth();

    const [focus, setFocus] = useState();
    const resaKeys = ["nom", "description", "date_resa", 'gerer', 'supprimer'];
    const resaHeader = ["Nom de la Salle", "Description", "Date", "Gérer", "Supprimer"];
    const { response } = useAxios("get", `http://localhost:3001/users/${user.id}/reservations`, null)

    const [delResaAdress, setDelResaAdress] = useState();
    const [resaContent, setResaContent] = useState();

    useAxios("delete", delResaAdress, resaContent)

    const handleDelete = (resa, index) => {
        // basic warning message, flemme de customiser
        if (window.confirm("On rend pas la monnaie.") == true) {
            setResaContent({ "resa_id": resa.id });
            setDelResaAdress(`http://localhost:3001/users/${user.id}/reservation`);
            response?.success[0].splice(index, 1);
        }
    }

    useEffect(() => {
        if (response) {
            response.success[0].sort((a, b) => new Date(a.date_resa) - new Date(b.date_resa));
            response.success[0].forEach((resa, index) => {
                resa['date_resa'] = new Date(resa['date_resa']).toLocaleDateString('en-GB');
                resa['gerer'] = <ButtonBasic handleClick={() => setFocus(resa)} buttonInnerText="Gérer" />;
                resa['supprimer'] = <ButtonBasic handleClick={() => handleDelete(resa, index)} buttonInnerText="Yeet" colorstyle='red' />;
                // resa['id'] = index; // fake id, for keys in itemlist
            });

        }
    }, [response])


    if (focus) {
        return (
            <div className="gestionresa">
                <GestionResa reservation={focus} setFocus={setFocus} />
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
                        keys={resaKeys}
                        headers={resaHeader}
                    />}
            </div>
        </div>
    );
}

export default Reservations;