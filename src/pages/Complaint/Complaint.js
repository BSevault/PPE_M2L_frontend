import useAxios from "../../hooks/useAxios/useAxios";
import "./Complaint.css";
import ItemList from "../../components/ItemList/ItemList";



const Complaint = ( {user} ) => {

    const keys = ['id', 'date_ticket', 'description', 'date_probleme', 'nom'];
    const headers = ['Num. ticket', 'Date de création du ticket', 'Description', 'Date du problème', 'Salle concernée' ]
    let { response : data } = useAxios('get', `http://localhost:3001/users/${user.id}/tickets`, null);
    if (data && data.success) {
        data = data.success; // .toLocaleDateString()
        console.log(data);
        }
            


        
        
    
    return(
        <div id="complaint">
            <h1>Réclamations</h1>
            <h2>Faire une réclamation</h2>
            <h2>Vos réclamations</h2>
            { data &&
                <ItemList 
                    name='complaints'
                    data={data}
                    keys={keys}
                    headers={headers}
                />
                
            }
        </div>
    )
}


export default Complaint;





