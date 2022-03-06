import useAxios from "../../hooks/useAxios/useAxios";
import "./Complaint.css";
import ItemList from "../../components/ItemList/ItemList";



const Complaint = ( {user} ) => {

    const keys = ['id', 'date_ticket', 'description', 'date_probleme', 'nom'];
    const headers = ['Num. ticket', 'Date de création du ticket', 'Description', 'Date du problème', 'Salle concernée' ]
    const { response } = useAxios('get', `http://localhost:3001/users/${user.id}/tickets`, null);
    if (response && response.success) {
        response.success.forEach( e =>{ 
            console.log(e.date_probleme);
        })
            
    }

        
        
    
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





