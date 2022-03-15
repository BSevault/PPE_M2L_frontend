import { useEffect } from 'react';
import { useAuth } from '../../components/contexts/AuthContext';
import ItemList from '../../components/ItemList/ItemList';
import useAxios from '../../hooks/useAxios/useAxios';
import './Reunions.css';

const Reunions = () => {
    const { user } = useAuth(); 

    const resaKeys = ["nom", "description", "date_resa"];
    const resaHeader = ["Nom de la Salle", "Description", "Date"];
    const { response } = useAxios("get", `http://localhost:3001/users/${user.id}/participations/history`, null)

    useEffect(() => {
        if (response) {
            response.success[0].sort((a, b) => new Date(b.date_resa) - new Date(a.date_resa));
            response.success[0].forEach((resa) => {
                resa['date_resa'] = new Date(resa['date_resa']).toLocaleDateString('en-GB');
            });

        }
    }, [response]) 

    return ( 
        <div className="reunions">
            {response &&
                <ItemList
                    name="reservations"
                    data={response.success[0]}
                    keys={resaKeys}
                    headers={resaHeader}
                />}
        </div>
     );
}
 
export default Reunions;