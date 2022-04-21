import { useAuth } from "../contexts/AuthContext";
import Calendar from "react-calendar";
import axios from "axios";
import { useSalles } from '../contexts/SallesContext';

import 'react-calendar/dist/Calendar.css';
import './SalleResa.css';

const SalleResa = ( {idSalle, input} ) => {
    const { user } = useAuth();
    const { setAllReservations, dateResevedSalle, setDateReservedSalle, resaConfirm, setResaConfirm, selectDay, jourSelected, setJourSelected } = useSalles();

    const endpoint = 'http://localhost:3001';
    // const endpoint = 'http://15.237.109.149:3001';
  
        // date de débout du calendrier.
    let startDate = new Date();
    
        // quand on clique sur une date du calendrier
    selectDay();
    
        // fonction d'envoi de la réservation
    const sendReservation = async () => {

        if (jourSelected) {
                // on envoie la réservation au back
            const result = await axios.post(endpoint + `/users/${user.id}/reservation`,
                {date: jourSelected, salle_id: idSalle, is_paid: 0}
            )
                // set un objet pour l'ajouter au state
            let resa = {date_resa: new Date(jourSelected).toDateString(), is_paid: 0, id_user: user.id, id_salle: idSalle};

                // update du state des reservations par salles
            setDateReservedSalle(prevState => [...prevState, resa]);
            setAllReservations(prevState => [...prevState, resa]);

                // si la réservation est confirmé, on affiche un message
            if (result.data.success) {
                setResaConfirm(`La salle est bien réservée pour le ${new Date(jourSelected).toLocaleString().split(",")[0]}`); 
                setJourSelected();
            }
            else {
                setResaConfirm(`Un problème est survenu, veuillez recommencer la réservation`);
            }
        } else {
            setResaConfirm(`Selectionner une date avant de réserver !`);
        }
    }

    return (  
        <div className="salle_resa">
               <Calendar minDate={startDate} onClickDay={(e) => selectDay(e, true)} tileDisabled={({date, view}) => {
                if((view === 'month' && date.getDay() === 0) || (view === 'month' && date.getDay() === 6)) return true;

                for(let i=0; i < dateResevedSalle.length; i++){
                    if(date.toDateString() === new Date(dateResevedSalle[i].date_resa).toDateString()) return true;
                }
            }} />
            <div className="desc_btn">
                {input}
                <input className='btn_resa_salle' type="submit" value="Réserver !" onClick={sendReservation}/>
                <p className="resa_confirm">{resaConfirm}</p>
            </div>
        </div>
    );
}
 
export default SalleResa;