import { useState } from 'react';
import Calendar from "react-calendar";
import ItemList from '../../components/ItemList/ItemList';
import PlanSalles from '../../components/PlanSalles/PlanSalles';
import useAxios from '../../hooks/useAxios/useAxios';

import './Salles.css'
import 'react-calendar/dist/Calendar.css';
import SalleResa from '../../components/SalleResa/SalleResa';

const Salles = () => {
    const keys = ['nom', 'description', 'capacite', 'prix'];

    const {response} = useAxios('get', 'http://localhost:3001/salles/');
    const {response: allResa} = useAxios('get', 'http://localhost:3001/users/all/reservations/');
    
    const [ headers, setHeaders ] = useState();
    const [ items, setItems ] = useState();
    const [ idSalle, setIdSalle ] = useState(5);
    
    

    const addData = (e, response) => {
        response.success.forEach( (salle) => {
                
            if (salle.nom === e.target.textContent || salle.nom === e.target.parentNode.children[1].textContent) {
                setHeaders([ 'Nom', 'Description', 'Capacité', 'Prix (€)']);
                setIdSalle(salle.id);
                // console.log(idSalle);
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

    return (  
        <div className="salles">
            <h1>Salles mise à disposition des ligues</h1>
            <PlanSalles selectSalle={selectSalle}/>
            {items &&
                <div className="list_resa">
                <SalleResa idSalle={idSalle} dataResa={allResa} />
                <ItemList name='salles' keys={keys} headers={headers} data={items}/>
            </div>}
        </div>
    );
}
 
export default Salles;