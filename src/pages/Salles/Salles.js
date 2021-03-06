import { useState } from 'react';
import ItemList from '../../components/ItemList/ItemList';
import PlanSalles from '../../components/PlanSalles/PlanSalles';
import SalleResa from '../../components/SalleResa/SalleResa';
import { useAuth } from '../../components/contexts/AuthContext';
import { useSalles } from '../../components/contexts/SallesContext';

import './Salles.css'
import 'react-calendar/dist/Calendar.css';

const Salles = () => {
    const { user } = useAuth();
    const { allReservations, setDateReservedSalle, setResaConfirm, allSalles } = useSalles();

        // values pour ItemList
    const keys = ['nom', 'description', 'capacite', 'prix'];
    
    const [ headers, setHeaders ] = useState();
    const [ items, setItems ] = useState();
    const [ idSalle, setIdSalle ] = useState(5);


        // quand on clique sur une salle du plan.
    const selectSalle = (e) => {
            // récupére dans le DOM toutes les balises avec la classe salles_loc
        const sallesAll = document.querySelectorAll(".salles_loc"); 
        
        // on retire toutes les classes salle_active des salles_loc
        sallesAll.forEach((salle) => {
            salle.classList.remove("salle_active");
        });
        setResaConfirm('');
            // la salle cliqué on rajoute salle_active
        e.target.parentNode.classList.add("salle_active");
        addData(e, allSalles); // appelle la fonction addData
    }
    
        // pour afficher les caracteristiques d'un salle + les résa de la salle selectionné
    const addData = (e, allSalles) => {
            // on parse toutes les salles
        allSalles.forEach( (salle) => {
                
                // on vérifie que le nom de la salle correspond au nom où l'on clique
            if (salle.nom === e.target.textContent || salle.nom === e.target.parentNode.children[1].textContent) {
                setHeaders([ 'Nom', 'Description', 'Capacité', 'Prix (€)']); // set le header
                setIdSalle(salle.id); // récup l'id salle
                setItems([salle]); // récup les données de la salle
                    // récupère toutes les résa pour la salle selectionnée
                setDateReservedSalle(allReservations.filter( (resa) => resa.id_salle === salle.id ));
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
                        <SalleResa idSalle={idSalle} 
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