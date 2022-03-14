import './ReservationHistoryDetails.css';
import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../ItemList/ItemList";

const ReservationHistoryDetails = ({ item: reservation }) => {


    const listPartiAdress = `http://localhost:3001/users/reservation/participants`
    const partiKeys = ["nom", "prenom", "email"];
    const partiHeader = ["Nom", "Prénom", "Email"];

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
                    />}
            </div>
            <div className="flexblock2">
                {response &&
                    <ItemList
                        name="reservations"
                        data={response.success[0]}
                        keys={partiKeys}
                        headers={partiHeader}
                    />}
            </div>
        </div>
    );
}

export default ReservationHistoryDetails;