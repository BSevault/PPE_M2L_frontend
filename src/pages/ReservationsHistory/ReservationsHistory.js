import './ReservationHistory.css';
import { useEffect } from "react";
import ButtonBasic from "../../components/ButtonBasic/ButtonBasic";
import { useAuth } from "../../components/contexts/AuthContext";
import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../../components/ItemList/ItemList";
import ReservationHistoryDetails from '../../components/ReservationHistoryDetails/ReservationHistoryDetails';

const ReservationsHistory = ({ setDisplayHistory }) => {
    const { user } = useAuth();

    const resaKeys = ["nom", "description", "date_resa"];
    const resaHeader = ["Nom de la Salle", "Description", "Date"];
    const { response } = useAxios("get", `http://localhost:3001/users/${user.id}/reservations/history`, null)

    useEffect(() => {
        if (response) {
            response.success[0].sort((a, b) => new Date(a.date_resa) - new Date(b.date_resa));
            response.success[0].forEach((resa) => {
                resa['date_resa'] = new Date(resa['date_resa']).toLocaleDateString('en-GB');
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