import './ReservationHistoryDetails.css';
import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../ItemList/ItemList";
import FactureResa from '../FactureResa/FactureResa';

const ReservationHistoryDetails = ({ item: reservation }) => {
    const { is_paid } = reservation;

    const listPartiAdress = `http://localhost:3001/users/reservation/participants`
    const partiKeys = ["nom", "prenom", "email"];
    const partiHeader = ["Liste des participants"];

    const { response } = useAxios("post", listPartiAdress, { "id_resa": reservation.id });


    return (
        <div className="reservation-history-details">
            <div className="flexblock">
                {response &&
                    <ItemList
                        name="reservations"
                        data={response.success[0]}
                        keys={partiKeys}
                        headers={partiHeader}
                        colorstyle={`blue`}
                    />}
            </div>
            <div className="flexblock2">
                <FactureResa id_resa={reservation.id} is_paid={is_paid} />
            </div>
        </div>
    );
}

export default ReservationHistoryDetails;