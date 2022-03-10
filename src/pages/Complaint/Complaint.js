import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../../components/ItemList/ItemList";
import ScrollSelect from '../../components/ScrollSelect/ScrollSelect';
import Calendar from "react-calendar";
import { useEffect, useState } from "react";

import "./Complaint.css";
import 'react-calendar/dist/Calendar.css';

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

    // on stocke le jour cliqué sur le calendrier
    const [ jourSelected, setJourSelected] = useState("");

    // date de début du calendrier.
    let startDate = new Date();

    // quand on clique sur une date du calendrier
    const selectDay = (e) => {
        // on formate la date dans le bon sens 
        let jour = new Date(e).toLocaleString().split(',')[0].split("/");
        jour = `${jour[2]}-${jour[1]}-${jour[0]}`;
        // on set la date
        setJourSelected(jour);
    }

    const sendTicket = (e) => {
        e.preventDefault();
        let description = document.getElementById("description").value;
        let id_salle = document.getElementById("salles").value;
        let id_produit = document.getElementById("produits").value;
        let date = startDate.toLocaleString();
        console.log(date);
        if (jourSelected === "") setJourSelected('test'); //peux pas le faire
        if (id_salle === "") id_salle = 1;
        if (id_produit === "") id_produit = 1;
        console.log(jourSelected);
        console.log(description);
        console.log(id_salle);
        console.log(id_produit);

    }


    // rendu
    return (
        <div id="complaint">
            <h1>Réclamations</h1>
            <h2>Faire une réclamation</h2>

            <form id="create-ticket-form">

                <div>
                    <p>Date de survenue du problème : </p>
                    <Calendar 
                    maxDate={startDate}
                    onClickDay={selectDay}
                    tileDisabled={({date}) => {
                        if(date.getDay() === 0 || date.getDay() === 6) return true;
                        }}
                    
                        
                    />
                </div>
                <ScrollSelect 
                    id="salles"
                    name="salles"
                    label="Salle concernée"
                    values={nom_salle}
                />

                <ScrollSelect
                    id="produits"
                    name="produits"
                    label="Produit concerné"
                    values={nom_produit}
                    
                />


                <label htmlFor="description">Description du problème : (1000 caractères max.)</label>
                <textarea
                    name="description"
                    id="description"
                    maxLength={1000}
                    required
                ></textarea> 


                <input
                    className='btn_ticket' 
                    type="submit"
                    value="Envoyer le ticket"
                    onClick={sendTicket}

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
