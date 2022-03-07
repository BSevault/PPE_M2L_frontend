import { useEffect, useState } from "react";
import ButtonBasic from "../../components/ButtonBasic/ButtonBasic";
import ItemList from "../../components/ItemList/ItemList";
import useAxios from "../../hooks/useAxios/useAxios";
import './GestionResa.css';

const GestionResa = ({ reservation, setFocus }) => {
    // const [resaKeys, setResaKeys] = useState();
    // useEffect(() => {
    //     if (reservation) setResaKeys(Object.keys(reservation))
    // }, [reservation]);
    const [participants, setParticipants] = useState();
    const partiKeys = ["nom", "prenom", "email"];
    const partiHeader = ["Nom", "Prénom", "Email"];

    const { response } = useAxios(
        "post",
        `http://localhost:3001/users/reservation/participants`,
        {
            "id_resa": reservation.id
        })

    useEffect(() => {
        if (response) setParticipants(response.success[0]);
        if (response) console.log(response.success[0]);
    }, [response])



    return (
        <div className="gestion-resa">
            <div className="return-resa">
                <ButtonBasic
                    handleClick={() => setFocus()}
                    buttonInnerText="Revenir à mes réservations"
                />
            </div>
            <div className="gestion-resa-content">
                <div className="add-user">
                    <p>future  formulaire ici</p>
                </div>
                <ul className="user-list">
                <h1 id="participants">
                    Participants
                </h1>
                    {participants &&
                        <ItemList
                            name="participants"
                            data={participants}
                            keys={partiKeys}
                            headers={partiHeader}
                        />}

                </ul>
            </div>
        </div>
    );
}

export default GestionResa;