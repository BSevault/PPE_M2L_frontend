import useAxios from "../../hooks/useAxios/useAxios";
import "./Complaint.css";
import ItemList from "../../components/ItemList/ItemList";
import { useEffect } from "react";

const Complaint = ( {user} ) => {

    const keys = ['id', 'date_ticket', 'description', 'date_probleme', 'nom'];
    const headers = ['Num. ticket', 'Date de création du ticket', 'Description', 'Date du problème', 'Salle concernée' ]
    let { response } = useAxios('get', `http://localhost:3001/users/${user.id}/tickets`, null);
    
    useEffect(() => {
        if (response) {
            console.log(response);
            response.success.forEach(ticket => {
                ticket['date_ticket'] = new Date(ticket['date_ticket']).toLocaleDateString();
                ticket['date_probleme'] = new Date(ticket['date_probleme']).toLocaleDateString();
                console.log(ticket);
            });
        }
    },[response])

    return(
        <div id="complaint">
            <h1>Réclamations</h1>
            <h2>Faire une réclamation</h2>
            <h2>Vos réclamations</h2>
            { response &&
                <ItemList 
                    name='complaints'
                    data={response.success}
                    keys={keys}
                    headers={headers}
                />
                
            }
        </div>
    )
}


export default Complaint;