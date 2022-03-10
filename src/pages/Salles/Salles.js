import { useState, useEffect } from 'react';
import ItemList from '../../components/ItemList/ItemList';
import PlanSalles from '../../components/PlanSalles/PlanSalles';
import useAxios from '../../hooks/useAxios/useAxios';
import SalleResa from '../../components/SalleResa/SalleResa';

import './Salles.css'
import 'react-calendar/dist/Calendar.css';

const Salles = ( {user} ) => {
        // values pour ItemList
    const keys = ['nom', 'description', 'capacite', 'prix'];

        // recupère toutes les salles
    const {response} = useAxios('get', 'http://localhost:3001/salles/');

        // récupère toutes les réservations des salles
    const {response: allResa} = useAxios('get', 'http://localhost:3001/users/all/reservations/');
    
    const [ allReservations, setAllReservations ] = useState();
    console.log(allReservations);
    const [ headers, setHeaders ] = useState();
    const [ items, setItems ] = useState();
    const [ idSalle, setIdSalle ] = useState(5);
    const [ dateResevedSalle, setDateReservedSalle] = useState();
    
    useEffect( () => {
        setAllReservations(allResa); //set toutes les reservations dans le state allReservations
    }, [allResa])

        // quand on clique sur une salle du plan.
    const selectSalle = (e) => {
            // récupére dans le DOM toutes les balises avec la classe salles_loc
        const sallesAll = document.querySelectorAll(".salles_loc"); 
        
            // on retire toutes les classes salle_active des salles_loc
        sallesAll.forEach((salle) => {
            salle.classList.remove("salle_active");
        });
        
            // la salle cliqué on rajoute salle_active
        e.target.parentNode.classList.add("salle_active");
        addData(e, response); // appelle la fonction addData
    }
    
        // pour afficher les caracteristiques d'un salle + les résa de la salle selectionné
    const addData = (e, response) => {
            // on parse toutes les salles
        response.success.forEach( (salle) => {
                
                // on vérifie que le nom de la salle correspond au nom où l'on clique
            if (salle.nom === e.target.textContent || salle.nom === e.target.parentNode.children[1].textContent) {
                setHeaders([ 'Nom', 'Description', 'Capacité', 'Prix (€)']); // set le header
                setIdSalle(salle.id); // récup l'id salle
                setItems([salle]); // récup les données de la salle
                    // récupère toutes les résa pour la salle selectionnée
                setDateReservedSalle(allReservations.success.filter( (resa) => resa.id_salle === salle.id ));
            }
        });
    }

    if (user) {
        return (  
            <div className="salles">
                <h1>Salles mise à disposition des ligues</h1>
                <PlanSalles selectSalle={selectSalle}/>
                {items &&
                    <div className="list_resa">
                        <SalleResa idSalle={idSalle} dateResevedSalle={dateResevedSalle} user={user} setAllReservations={setAllReservations} allReservations={allReservations} setDateReservedSalle={setDateReservedSalle} 
                        input={
                            <ItemList name='salles' keys={keys} headers={headers} data={items}/>} />
                    </div>
                }
            </div>
        );
    } else {
        return (  
            <div className="salles">
                <h1>Salles mise à disposition des ligues</h1>
                <PlanSalles selectSalle={selectSalle}/>
                {items &&
                    <div className="list_resa">
                        <ItemList name='salles' keys={keys} headers={headers} data={items}/>
                    </div>
                }
            </div>
        );
    }
}
 
export default Salles;