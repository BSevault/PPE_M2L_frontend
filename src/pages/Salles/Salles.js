
import { useState } from 'react';
// import ItemList from '../../components/ItemList/ItemList';
import PlanSalles from '../../components/PlanSalles/PlanSalles';
import useAxios from '../../hooks/useAxios/useAxios';
import './Salles.css'

const Salles = () => {
    const keys = ['nom', 'description', 'capacite', 'prix'];
    const name = 'salles';
    // const headerKeys = [ 'Nom', 'Description', 'Capacité (nb personnes)', 'Prix (€)']

    // const salleCarac = useRef();
    const {response} = useAxios('get', 'http://localhost:3001/salles/');

    const [ headers, setHeaders ] = useState();
    const [ items, setItems ] = useState();

    const addData = (e, response) => {
        response.success.forEach( (salle) => {
                
            if (salle.nom === e.target.textContent || salle.nom === e.target.parentNode.children[1].textContent) {
                setHeaders([ 'Nom', 'Description', 'Capacité (nb personnes)', 'Prix (€)']);
                delete salle.id;
                setItems([salle]);
            }
        });
    }

    const selectSalle = (e) => {
        const sallesAll = document.querySelectorAll(".salles_loc");

        sallesAll.forEach((salle) => {
            salle.classList.remove("salle_active");
        });

        if (e.target.parentNode.classList.contains("salles_loc")) {
            e.target.parentNode.classList.add("salle_active");
            addData(e, response);

        } else if (e.target.parentNode.parentNode.classList.contains("salles_loc")) {
            e.target.parentNode.parentNode.classList.add("salle_active");
            addData(e, response);
        }
    }

    return (  
        <div className="salles">
            <h1>Salles mise à disposition des ligues</h1>
            
            <PlanSalles selectSalle={selectSalle}/>
            
            <div className={`item-list ${name}-list`}>
                <ul className={`item headers ${name}-headers`}>
                    {headers &&
                        headers.map((header, index) => (
                            <li key={`${name}-headers-key-${index}`}>{header}</li>
                        ))}
                </ul>

            {items &&
                items.map((item) => (
                    <ul className={`item ${name}-item`} key={`item-${item.id}`}>
                        {keys.map((key, index) => (
                            <li key={`${name}-key-${index}`}> {item[key]} </li>
                        ))}
                    </ul>
                ))}
            </div>

            {/* <ItemList name='salles'  content={null} keys={sallesKeys} headers={headerKeys} data={dataSalle}/> */}
        </div>
    );
}
 
export default Salles;