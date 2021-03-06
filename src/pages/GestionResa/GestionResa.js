import axios from "axios";
import { useEffect, useState } from "react";
import AddParticipant from "../../components/AddParticipant/AddParticipant";
import ButtonBasic from "../../components/ButtonBasic/ButtonBasic";
import { useAuth } from "../../components/contexts/AuthContext";
import ItemList from "../../components/ItemList/ItemList";
import useAxios from "../../hooks/useAxios/useAxios";
import './GestionResa.css';

const GestionResa = ({ reservation, setFocus }) => {
    const { user, endpoint } = useAuth();

    const [participants, setParticipants] = useState();
    const [partiEmail, setPartiEmail] = useState('');
    const [partiInfo, setPartiInfo] = useState();
    const [listPartiAdress, setListPartiAdress] = useState( endpoint + `/users/reservation/participants`);
    const [crudPartiAdress, setCrudPartiAdress] = useState();
    const [method, setMethod] = useState();
    const partiKeys = ["nom", "prenom", "email", "supprimer"];
    const partiHeader = ["Nom", "Prénom", "Email", "Supprimer"];

    // get participant list
    const { response } = useAxios(
        "post",
        listPartiAdress,
        {
            "id_resa": reservation.id
        })

    // fetchs en attente de click
    useAxios(method, crudPartiAdress, partiInfo)

    // If email parameter in participants list, return true -- prevent submiting already present participant
    const userExists = (email) => {
        return participants.some((el) => el.email === email)
    }

    const handleSubmit = (e) => {
        e?.preventDefault();
        const patternEmail = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!userExists(partiEmail) && patternEmail.test(partiEmail)) {
            setMethod("post");
            setPartiInfo({
                "resa_id": reservation.id,
                "email": partiEmail
            });

            // trigger the request + reset the participants fetch
            setCrudPartiAdress(`/users/${user.id}/participations`);
            setTimeout(() => setListPartiAdress(), 100);
            // setListPartiAdress();

        }
        // console.log('handle error here -- pages/GestionResa/GestionResa.js');
    };

    const handleDelete = async (partiEl) => {
        setMethod("delete");
        setPartiInfo({
            "user_id": partiEl.id,
            "resa_id": reservation.id
        });

        // // trigger the request + reset the participants fetch
        setCrudPartiAdress(`/users/${user.id}/participations`)
        setTimeout(() => setListPartiAdress(), 100);
        // setListPartiAdress();
        // response?.success[0].splice(index, 1);
    }

    useEffect(() => {
        setListPartiAdress(`/users/reservation/participants`);
        setPartiEmail('');
        setCrudPartiAdress();
        // setDelPartiAdress();
        if (response) {
            response.success[0].forEach((partiEl) => {
                partiEl['supprimer'] = <ButtonBasic handleClick={() => handleDelete(partiEl)} buttonInnerText="Yeet" colorstyle='red' />;
            });
            response.success[0][0].supprimer = '';
            setParticipants(response.success[0]);
        }

    }, [response, listPartiAdress])




    return (
        <div className="gestion-resa">
            <h1 className="info-resa">Réservation de la salle {reservation.nom} à la date du {reservation.date_resa}</h1>
            <div className="return-resa">
                <ButtonBasic
                    handleClick={() => setFocus()}
                    buttonInnerText="Revenir à mes réservations"
                    style={{ width: '400px' }}
                />
            </div>
            <div className="gestion-resa-content">
                <div className="add-user">
                    <AddParticipant
                        partiEmail={partiEmail}
                        setPartiEmail={setPartiEmail}
                        handleSubmit={handleSubmit}
                    />
                </div>
                <ul className="user-list">
                    <h2 id="participants">
                        Participants
                    </h2>
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