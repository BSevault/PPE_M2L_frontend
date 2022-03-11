import { useState, useRef } from 'react';
import { useAuth } from "../contexts/AuthContext";
import Calendar from "react-calendar";
import axios from "axios";

import 'react-calendar/dist/Calendar.css';
import './SalleResa.css';

const SalleResa = ( {idSalle, dateResevedSalle, input, setAllReservations, allReservations, setDateReservedSalle} ) => {
    const { user } = useAuth();

    const [ jourSelected, setJourSelected] = useState();
    const [ resaConfirm, setResaConfirm] = useState();
    const resa_confirm = useRef();
  
        // date de débout du calendrier.
    let startDate = new Date();
    
        // quand on clique sur une date du calendrier
    const selectDay = (e) => {
            // on formate la date dans le bon sens 
        let jour = new Date(e).toLocaleDateString('en-GB').split(',')[0].split("/");
        jour = `${jour[2]}-${jour[1]}-${jour[0]}`;
            // on set la date
        setJourSelected(jour);
        setResaConfirm("");
        // console.log(jourSelected);
    }
    
        // fonction d'envoi de la réservation
    const sendReservation = async () => {

        if (jourSelected) {
                // on envoie la réservation au back
            const result = await axios.post(`http://localhost:3001/users/${user.id}/reservation`,
                {date: jourSelected, salle_id: idSalle, is_paid: 0}
            )
                // set un objet pour l'ajouter au state
            let resa = {date_resa: new Date(jourSelected).toDateString(), is_paid: 0, id_user: user.id, id_salle: idSalle};

                // update du state des reservations par salles
            setDateReservedSalle(prevState => [...prevState, resa]);

            allReservations.success.push(resa);
            setAllReservations(allReservations);

                // si la réservation est confirmé, on affiche un message
            if (result.data.success) {
                setResaConfirm(`La salle est bien réservée pour le ${new Date(jourSelected).toLocaleString().split(",")[0]}`); 
            }
            else {
                setResaConfirm(`Un problème est survenu, veuillez recommencer la réservation`);
            }
        } else {
            setResaConfirm(`Selectionner une date avant de réserver !`);
        }
    }



        // quand on clique quelque part on vide le <p> de confirmation de réservation
    // document.onclick = () => {
    //     setResaConfirm("");
    // }

    return (  
        <div className="salle_resa">
               <Calendar minDate={startDate} onClickDay={selectDay} tileDisabled={({date, view}) => {
                if((view === 'month' && date.getDay() === 0) || (view === 'month' && date.getDay() === 6)) return true;

                for(let i=0; i < dateResevedSalle.length; i++){
                    if(date.toDateString() === new Date(dateResevedSalle[i].date_resa).toDateString()) return true;
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