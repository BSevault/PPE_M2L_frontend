import { useState } from 'react';
import Calendar from "react-calendar";
import ItemList from '../../components/ItemList/ItemList';
import PlanSalles from '../../components/PlanSalles/PlanSalles';
import useAxios from '../../hooks/useAxios/useAxios';

import './Salles.css'
import 'react-calendar/dist/Calendar.css';

const Salles = () => {
    const keys = ['nom', 'description', 'capacite', 'prix'];

    const {response} = useAxios('get', 'http://localhost:3001/salles/');

    // const {response} = useAxios('get', 'http://localhost:3001/users/all/reservations/');

    console.log(response);

    const [ headers, setHeaders ] = useState();
    const [ items, setItems ] = useState();
    const [ idSalle, setIdSalle ] = useState();
    

    const addData = (e, response) => {
        response.success.forEach( (salle) => {
                
            if (salle.nom === e.target.textContent || salle.nom === e.target.parentNode.children[1].textContent) {
                setHeaders([ 'Nom', 'Description', 'Capacité', 'Prix (€)']);
                setIdSalle(salle.id);
                console.log(idSalle);
                setItems([salle]);
            }
        });
    }

    const selectSalle = (e) => {
        const sallesAll = document.querySelectorAll(".salles_loc");

        sallesAll.forEach((salle) => {
            salle.classList.remove("salle_active");
        });

        e.target.parentNode.classList.add("salle_active");
        addData(e, response);
    }

    const selectDay = (e) => {
        let jour = new Date(e).toLocaleString().split(",")[0].split("/");
        jour = `${jour[2]}-${jour[1]}-${jour[0]}`;
        console.log(jour, idSalle);
    }

    return (  
        <div className="salles">
            <h1>Salles mise à disposition des ligues</h1>
            <PlanSalles selectSalle={selectSalle}/>
            <div className="list_resa">
                { items &&
                    <Calendar onClickDay={selectDay} tileDisabled={({activeStartDate, date, view }) => {
                        console.log(date)
                        if(date.getDay() === 0 || date.getDay() === 6) return true;

                    }} /> }
                <ItemList name='salles' keys={keys} headers={headers} data={items}/>
            </div>
        </div>
    );
}
 
export default Salles;