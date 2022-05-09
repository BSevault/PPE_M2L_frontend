/**
 * This function displays the user's previous reservations
 * @returns The return is the `ReservationHistory` component.
 */
import './ReservationHistory.css';
import { useEffect } from "react";
import ButtonBasic from "../../components/ButtonBasic/ButtonBasic";
import { useAuth } from "../../components/contexts/AuthContext";
import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../../components/ItemList/ItemList";
import ReservationHistoryDetails from '../../components/ReservationHistoryDetails/ReservationHistoryDetails';
import { useState } from 'react';

const ReservationsHistory = ({ setDisplayHistory }) => {
    const { user } = useAuth();
    const [isSorted, setIsSorted] = useState(true);
    const [sortDirection, setSortDirect] = useState('v');

    const resaKeys = ["nom", "description", "date_resa_formated"];
    const resaHeader = ["Nom de la Salle", "Description",  <p className="sort-date" onClick={() => sortResponses(isSorted)}>Date: {sortDirection}</p>];
    const { response } = useAxios("get", `/users/${user.id}/reservations/history`, null)

    const sortResponses = (isSorted) => {
        if (isSorted) {
            setIsSorted(false);
            if (response) response.success[0].sort((a, b) => new Date(b.date_resa) - new Date(a.date_resa));
            setSortDirect('^');
        } else {
            setIsSorted(true);
            if (response) response.success[0].sort((a, b) => new Date(a.date_resa) - new Date(b.date_resa));
            setSortDirect('v');
        }
    }

    useEffect(() => {
        if (response) {
            response.success[0].sort((a, b) => new Date(a.date_resa) - new Date(b.date_resa));
            response.success[0].forEach((resa) => {
                resa['date_resa_formated'] = new Date(resa['date_resa']).toLocaleDateString('en-GB');
            });

        }
    }, [response])

    return (
        <div className="reservations-history">
            <h1 className="history-reservation-title">Vos précendents réservations</h1>
            <div className="return-resa">
                <ButtonBasic
                    handleClick={() => setDisplayHistory(false)}
                    buttonInnerText="Revenir à mes réservations"
                    style={{ width: '400px' }}
                />
            </div>
            {response &&
                <ItemList
                    name="reservations"
                    data={response.success[0]}
                    keys={resaKeys}
                    headers={resaHeader}
                    ExtraContent={ReservationHistoryDetails}
                />}
        </div>
    );
}

export default ReservationsHistory;