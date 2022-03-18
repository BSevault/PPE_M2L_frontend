import { useEffect, useState } from 'react';
import ButtonBasic from '../../components/ButtonBasic/ButtonBasic';
import { useAuth } from '../../components/contexts/AuthContext';
import ItemList from '../../components/ItemList/ItemList';
import useAxios from '../../hooks/useAxios/useAxios';
import ReservationsHistory from '../ReservationsHistory/ReservationsHistory';
import './Reunions.css';

const Reunions = () => {
    const { user } = useAuth();

    const [displayHistory, setDisplayHistory] = useState(false);

    const resaKeys = ["nom_salle", "email", "date_resa"];
    const resaHeader = ["Nom de la Salle", "Email de l'organisateur", "Date"];
    // we can pass a button in resaHeader with handleclick that sort date, cf useEffect for sort function usage (inverse a & b to invert sorting)
    // const resaHeader = ["Nom de la Salle", "Email de l'organisateur", <ButtonBasic handleClick={() => console.log('clicked in itemlist header')} buttonInnerText="Date"/>];

    // 2 request, first for future reunions then history of reunions -- next time setup that with a single request from backend
    const { response } = useAxios("get", `http://localhost:3001/users/${user.id}/participations`, null)
    const { response: responseHistory } = useAxios("get", `http://localhost:3001/users/${user.id}/participations/history`, null)

    useEffect(() => {
        if (response) {
            response.success[0].sort((a, b) => new Date(a.date_resa) - new Date(b.date_resa));
            response.success[0].forEach((resa) => {
                resa['date_resa'] = new Date(resa['date_resa']).toLocaleDateString('en-GB');
            });
        }

        if (responseHistory) {
            responseHistory.success[0].sort((a, b) => new Date(b.date_resa) - new Date(a.date_resa));
            responseHistory.success[0].forEach((resa) => {
                resa['date_resa'] = new Date(resa['date_resa']).toLocaleDateString('en-GB');
            });
        }

    }, [response, responseHistory])

    if (displayHistory) {
        return (
            <div className="reunions">
                <h1 className="reunions-title">Vos anciennes réunions</h1>
                <div className="display-history">
                    <ButtonBasic
                        handleClick={() => setDisplayHistory(false)}
                        buttonInnerText="Revenir à mes réunions"
                        style={{ width: '400px' }}
                    />
                </div>
                {response &&
                    <ItemList
                        name="reservations"
                        data={responseHistory.success[0]}
                        keys={resaKeys}
                        headers={resaHeader}
                    />}
            </div>
        )
    }

    return (
        <div className="reunions">
            <h1 className="reunions-title">Vos prochaines réunions</h1>
            {response &&
                <ItemList
                    name="reservations"
                    data={response.success[0]}
                    keys={resaKeys}
                    headers={resaHeader}
                />}
            <div className="display-history">
                <ButtonBasic
                    handleClick={() => setDisplayHistory(true)}
                    buttonInnerText="Historique des réunions"
                    style={{ width: '400px' }}
                />
            </div>
        </div>
    );
}

export default Reunions;