import Calendar from "react-calendar";
import axios from "axios";
import { useState, useRef } from 'react';

import 'react-calendar/dist/Calendar.css';
import './SalleResa.css';

const SalleResa = ( {idSalle, dateResevedSalle, user, input, setAllReservations, allReservations, setDateReservedSalle} ) => {
    const [ jourSelected, setJourSelected] = useState("");
    const [ resaConfirm, setResaConfirm] = useState();
    const resa_confirm = useRef();
  
    let startDate = new Date();
    
    const selectDay = (e) => {
        let jour = new Date(e).toLocaleString().split(",")[0].split("/");
        jour = `${jour[2]}-${jour[1]}-${jour[0]}`;
        setJourSelected(jour);
    }
    
    const sendReservation = async () => {
        const result = await axios.post(`http://localhost:3001/users/${user.id}/reservation`,
            {date: jourSelected, salle_id: idSalle, is_paid: 0}
        )
        let resa = {date_resa: new Date(jourSelected).toISOString(), is_paid: 0, id_user: user.id, id_salle: idSalle};

        setDateReservedSalle(prevState => [...prevState, resa]);
        // console.log(dateResevedSalle);

        if (result.data.success) {
            setResaConfirm(`La salle est bien réservée pour le ${new Date(jourSelected).toLocaleString().split(",")[0]}`); 
        }
        else {
            setResaConfirm(`Un problème est survenu, veuillez recommencer la réservation`);
        }
    }

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