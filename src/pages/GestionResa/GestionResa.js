import { useEffect, useState } from "react";
import AddParticipant from "../../components/AddParticipant/AddParticipant";
import ButtonBasic from "../../components/ButtonBasic/ButtonBasic";
import { useAuth } from "../../components/contexts/AuthContext";
import ItemList from "../../components/ItemList/ItemList";
import useAxios from "../../hooks/useAxios/useAxios";
import './GestionResa.css';

const GestionResa = ({ reservation, setFocus }) => {
    const { user } = useAuth();

    const [participants, setParticipants] = useState();
    const [partiEmail, setPartiEmail] = useState('');
    const [content, setContent] = useState();
    const [addPartiAdress, setAddPartiAdress] = useState();
    const partiKeys = ["nom", "prenom", "email"];
    const partiHeader = ["Nom", "Prénom", "Email"];

    const { response } = useAxios(
        "post",
        `http://localhost:3001/users/reservation/participants`,
        {
            "id_resa": reservation.id
        })

    const { response: respEmail } = useAxios("post", addPartiAdress, content )

    const userExists = (email) => {
        return participants.some((el) => el.email === email)
    }

    const handleSubmit = (e) => {
        e?.preventDefault();
        const patternEmail = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!userExists(partiEmail) && patternEmail.test(partiEmail)) {
            setContent({
                "resa_id": reservation.id,
                "email": partiEmail
            });
            setAddPartiAdress(`http://localhost:3001/users/${user.id}/participations`);
            console.log('submited email !');

        }
        console.log('handle error here');
    };

    useEffect(() => {
        if (response) setParticipants(response.success[0]);
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
                    <AddParticipant
                        partiEmail={partiEmail}
                        setPartiEmail={setPartiEmail}
                        handleSubmit={handleSubmit}
                    />
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