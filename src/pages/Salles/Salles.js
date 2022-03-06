import { useState, useEffect } from 'react';
import ItemList from '../../components/ItemList/ItemList';
import PlanSalles from '../../components/PlanSalles/PlanSalles';
import useAxios from '../../hooks/useAxios/useAxios';
import SalleResa from '../../components/SalleResa/SalleResa';

import './Salles.css'
import 'react-calendar/dist/Calendar.css';

const Salles = ( {user} ) => {
    const keys = ['nom', 'description', 'capacite', 'prix'];

    const {response} = useAxios('get', 'http://localhost:3001/salles/');
    const {response: allResa} = useAxios('get', 'http://localhost:3001/users/all/reservations/');
    
    const [ allReservations, setAllReservations ] = useState();
    console.log(allReservations);
    const [ headers, setHeaders ] = useState();
    const [ items, setItems ] = useState();
    const [ idSalle, setIdSalle ] = useState(5);
    const [ dateResevedSalle, setDateReservedSalle] = useState();

    const addData = (e, response) => {
        response.success.forEach( (salle) => {
                
            if (salle.nom === e.target.textContent || salle.nom === e.target.parentNode.children[1].textContent) {
                setHeaders([ 'Nom', 'Description', 'Capacité', 'Prix (€)']);
                setIdSalle(salle.id);
                setItems([salle]);
                setDateReservedSalle(allReservations.success.filter( (resa) => resa.id_salle === salle.id ));
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
    
    useEffect( () => {
        setAllReservations(allResa);
    }, [allResa])

    return (  
        <div className="salles">
            <h1>Salles mise à disposition des ligues</h1>
            <PlanSalles selectSalle={selectSalle}/>
            {items &&
                <div className="list_resa">
                    <SalleResa idSalle={idSalle} dataResa={dateResevedSalle} user={user} input={
                        <ItemList name='salles' keys={keys} headers={headers} data={items}/>} setAllReservations={setAllReservations} allReservations={allReservations} setDateReservedSalle={setDateReservedSalle} />
                </div>
            }
        </div>
    );
}
 
export default Salles;