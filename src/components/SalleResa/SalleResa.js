import Calendar from "react-calendar";
import axios from "axios";
import { useState, useRef } from 'react';

import 'react-calendar/dist/Calendar.css';
import './SalleResa.css';
import { useNavigate } from "react-router-dom";

const SalleResa = ( {idSalle, dateResevedSalle, user, input, setAllReservations, allReservations, setDateReservedSalle} ) => {
    const [ jourSelected, setJourSelected] = useState("");
    const [ resaConfirm, setResaConfirm] = useState();
    const resa_confirm = useRef();
    const navigate = useNavigate();
  
        // date de débout du calendrier.
    let startDate = new Date();
    
        // quand on clique sur une date du calendrier
    const selectDay = (e) => {
            // on formate la date dans le bon sens 
        let jour = new Date(e).toLocaleString().split(',')[0].split("/");
        jour = `${jour[2]}-${jour[1]}-${jour[0]}`;
            // on set la date
        setJourSelected(jour);
    }
    
        // fonction d'envoi de la réservation
    const sendReservation = async () => {
            // on envoie la réservation au back
        const result = await axios.post(`http://localhost:3001/users/${user.id}/reservation`,
            {date: jourSelected, salle_id: idSalle, is_paid: 0}
        )
            // set un objet pour l'ajouter au state
        let resa = {date_resa: new Date(jourSelected).toISOString(), is_paid: 0, id_user: user.id, id_salle: idSalle};

            // update du state des reservations par salles
        setDateReservedSalle(prevState => [...prevState, resa]);
        // console.log(dateResevedSalle);

        
        // navigate("/reservations");
            // si la réservation est confirmé, on affiche un message
        // if (result.data.success) {
        //     setResaConfirm(`La salle est bien réservée pour le ${new Date(jourSelected).toLocaleString().split(",")[0]}`); 
        // }
        // else {
        //     setResaConfirm(`Un problème est survenu, veuillez recommencer la réservation`);
        // }
    }

        // quand on clique quelque part on vide le <p> de confirmation de réservation
    document.onclick = () => {
        setResaConfirm("");
    }

    return (  
        <div className="salle_resa">
               <Calendar minDate={startDate} onClickDay={selectDay} tileDisabled={({date}) => {
                if(date.getDay() === 0 || date.getDay() === 6) return true;
                for(let i=0; i < dateResevedSalle.length; i++){
                    // console.log(dataResa)
                    if(date.toJSON() === new Date(dateResevedSalle[i].date_resa).toJSON()) return true;
                }
            }} />
            <div className="desc_btn">
                {input}
                <input className='btn_resa_salle' type="submit" value="Réserver !" onClick={sendReservation}/>
                <p className="resa_confirm" ref={resa_confirm}>{resaConfirm}</p>
            </div>
        </div>
    );
}
 
export default SalleResa;