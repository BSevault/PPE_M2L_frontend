
import { useRef } from 'react';
import ItemList from '../../components/ItemList/ItemList';
import PlanSalles from '../../components/PlanSalles/PlanSalles';
import './Salles.css'

const Salles = () => {
    const sallesKeys = ['nom', 'description', 'capacite', 'prix'];

    const salleCarac = useRef();

    return (  
        <div className="salles">
            <h1>Salles mise à disposition des ligues</h1>
            <p className="salle_carac" ref={salleCarac}>

            </p>
            <PlanSalles refText={salleCarac} />
            <ItemList name='salles' method='get' adress='http://localhost:3001/salles/' content={null} keys={sallesKeys} />
        </div>
    );
}
 
export default Salles;