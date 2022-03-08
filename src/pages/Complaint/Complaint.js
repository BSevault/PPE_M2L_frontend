import useAxios from "../../hooks/useAxios/useAxios";
import "./Complaint.css";
import ItemList from "../../components/ItemList/ItemList";
import ScrollSelect from '../../components/ScrollSelect/ScrollSelect';
import { useEffect, useState } from "react";

const Complaint = ({ user }) => {
    // on définit les clés et les headers de la liste de tickets
    const keys = ["id", "date_ticket", "date_probleme", "nom", "nom_produit","description"];
    const headers = [
        "N° ticket",
        "Date de création du ticket",
        "Date du problème",
        "Salle concernée",
        "Produit concerné",
        "Description"
    ];

    // on définit un state des tickets pour manier la liste en local sans avoir à requêter à nouveau en cas de modifs
    const [complaints, setComplaints] = useState([]);

    // on requête la liste des produits sur la db via le backend pour en extraire les noms dans un tableau
    const { response : produits } = useAxios("get", "http://localhost:3001/produits");
    const [nom_produit, setNom_produit] = useState([]);
    
    // on requête la liste des salles sur la db via le backend pour en extraire les noms dans un tableau
    const { response : salles } = useAxios("get", "http://localhost:3001/salles/all");
    const [nom_salle, setNom_salle] = useState([]);

    // on requête la liste des tickets sur la db via le backend
    const { response } = useAxios("get", `http://localhost:3001/users/${user.id}/tickets`);

    // on gère ma logique dans un useEffect sinon ça déraille
    useEffect(() => {
        if (response && produits && salles) {

            // on formate les dates => dd/mm/yyy
            setComplaints(response.success);
            complaints.forEach( (ticket) => {
                ticket["date_ticket"] = new Date(ticket["date_ticket"]).toLocaleDateString();
                ticket["date_probleme"] = new Date(ticket["date_probleme"]).toLocaleDateString();
            });

            // on controle la longueur de la liste des noms de produit pour eviter les duplications
            if (nom_produit.length < produits.success.length){
                produits.success.forEach( (produit) => {
                    setNom_produit(prevstate => [...prevstate, produit.nom_produit])
                })
            }
            
            // on controle la longueur de la liste des noms de salle pour eviter les duplications
            if (nom_salle.length < salles.success.length){
                salles.success.forEach( (salle) => {
                    setNom_salle(prevstate => [...prevstate, salle.nom])
                })
            }

            console.log(nom_produit);
            console.log(nom_salle);

        }
    }, [response,complaints, produits, salles]);

    // on définit un message si il n'y a pas de ticket 
    let message = "";
    if (complaints.length < 1 ) message = "Vous n'avez pas encore soumis de ticket";

    // rendu
    return (
        <div id="complaint">
            <h1>Réclamations</h1>
            <h2>Faire une réclamation</h2>

            <form id="create-ticket-form">
                <ScrollSelect
                    name="produits"
                    label="Produit concerné"
                    values={nom_produit} 
                />

                <ScrollSelect 
                    name="salles"
                    label="Salle concernée"
                    values={nom_salle}
                />
            </form>
                <p>*N.A. : non applicable</p>

            <h2>Vos réclamations</h2>
            
                <ItemList
                    name="complaints"
                    data={complaints}
                    keys={keys}
                    headers={headers}
                />

            <p>{message}</p>
        </div>
    );
};

export default Complaint;
