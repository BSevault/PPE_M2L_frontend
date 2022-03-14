import axios from 'axios';
import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../../components/ItemList/ItemList";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import ScrollSelect from '../../components/ScrollSelect/ScrollSelect';
import Calendar from "react-calendar";

import "./Complaint.css";
import 'react-calendar/dist/Calendar.css';

const Complaint = () => {
    const { user } = useAuth();
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

    // date de début du calendrier.
    let startDate = new Date();

    const description = useRef();
    const id_salle = useRef();
    const id_produit = useRef();

    // on requête la liste des tickets sur la db via le backend
    const { response: allUserTickets } = useAxios("get", `http://localhost:3001/users/${user.id}/tickets`);

    // on requête la liste des salles sur la db via le backend pour en extraire les noms dans un tableau
    const { response : salles } = useAxios("get", "http://localhost:3001/salles/all");

    // on requête la liste des produits sur la db via le backend pour en extraire les noms dans un tableau
    const { response : produits } = useAxios("get", "http://localhost:3001/produits");

    
    // on définit un state des tickets pour manier la liste en local sans avoir à requêter à nouveau en cas de modifs
    const [tickets, setTickets] = useState();
    // console.log('tickets : ', tickets);
    // console.log('allUserTickets : ', allUserTickets);
    
    const [nom_salle, setNom_salle] = useState([]);
    
    const [nom_produit, setNom_produit] = useState([]);
    
    // const [newTicket, setNewTicket] = useState();

    const dateFormatToDB = (date) => {
        let jour = new Date(date).toLocaleString('en-GB').split(',')[0].split("/");
        jour = `${jour[2]}-${jour[1]}-${jour[0]}`;
        return jour;
    }
    
    const dateFormatFromDB = (date) => {
        // console.log(date);
        // console.log(date instanceof Date);
        
        let jour = new Date(date).toLocaleString('en-GB').split(',')[0].split("/");
        jour = `${jour[0]}/${jour[1]}/${jour[2]}`;
        return jour;
    }

    useEffect( () => {
        if(allUserTickets) {
            setTickets(allUserTickets?.success);
        }
    }, [allUserTickets]);

    
    useEffect( ()=> {
        if (tickets) {
            // on formate les dates => dd/mm/yyy
            console.log('ticket dans useEffect',tickets);
            tickets?.forEach( (ticket) => {
                if (ticket["date_ticket"][2] !== '/') {
                    ticket["date_ticket"] = dateFormatFromDB(ticket["date_ticket"]);
                    ticket["date_probleme"] = dateFormatFromDB(ticket["date_probleme"]);
                }
            });    
        }
    }
    ,[tickets])

    if (salles && produits) {
        // on controle la longueur de la liste des noms de salle pour eviter les duplications
        if (nom_salle.length < salles.success.length){
            salles.success.forEach( (salle) => {
                setNom_salle(prevstate => [...prevstate, salle.nom])
            });
        }

    // on controle la longueur de la liste des noms de produit pour eviter les duplications
        if (nom_produit.length < produits.success.length){
            produits.success.forEach( (produit) => {
                setNom_produit(prevstate => [...prevstate, produit.nom_produit])
            });
        }
        // console.log(nom_salle);
        // console.log(nom_produit);
    }


    
    // on définit un message si il n'y a pas de ticket 

    

    // quand on clique sur une date du calendrier
    const selectDay = (e) => {
        // on set la date
        setJourSelected(dateFormatToDB (e));
    }

     // on stocke le jour cliqué sur le calendrier
    const [ jourSelected, setJourSelected] = useState(dateFormatToDB(startDate));

    
    const sendTicket = async (e) => {
        e.preventDefault();
        console.log('date probleme :', jourSelected);
        console.log('description :', description.current.value);
        console.log('user.id :', user.id);
        console.log('id_salle :', id_salle.current.value);
        console.log('id_produit :', id_produit.current.value);
        let id_newTicket = '';
         
        try {
            const send = await axios.post(`http://localhost:3001/users/${user.id}/tickets`,
                {date_probleme: dateFormatToDB(jourSelected), description: description.current.value, id_user: user.id, id_salle: parseInt(id_salle.current.value)+1, id_produit: parseInt(id_produit.current.value)+1});
            console.log(send.data.success[0]['id']);
            id_newTicket = send.data.success[0]['id'];
        } catch (error) {
            console.log(error.message);
        }

        let newSalle = "";
        let newProduit = "";

        nom_salle.forEach( (el, index) => {
            if (index == id_salle.current.value) {
                newSalle = el;
            }
        });

        nom_produit.forEach( (el, index) => {
            if (index == id_produit.current.value) {
                newProduit = el;
            }
        });

        let newTicket = ({ id: id_newTicket, date_ticket: dateFormatToDB(startDate), date_probleme: jourSelected, nom: newSalle, nom_produit: newProduit, description: description.current.value})
        console.log('newTicket : ',newTicket);
        
        
        setTickets(prevstate => [...prevstate, newTicket]);

        // setTickets(prevstate =>  prevstate.success.push(newTicket));
        // console.log('temp : ',temp);
        // console.log('tickets.success : ',tickets.success);
        // console.log('allUserTickets',allUserTickets);




        

    }


    // rendu
    return (
        <div id="complaint">
            <h1>Réclamations</h1>
            <h2>Faire une réclamation</h2>

            <form id="create-ticket-form" onSubmit={sendTicket}>

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
                { salles &&
                    <ScrollSelect 
                    id="salles"
                    name="salles"
                    label="Salle concernée"
                    values={nom_salle.slice(1)}
                    ref={id_salle}
                />
                }

                { produits && 
                    <ScrollSelect
                        id="produits"
                        name="produits"
                        label="Produit concerné"
                        values={nom_produit.slice(1)}
                        ref={id_produit}
                    />
                }


                <label htmlFor="description">Description du problème : (1000 caractères max.)</label>
                <textarea
                    name="description"
                    id="description"
                    maxLength={1000}
                    required
                    ref={description}
                ></textarea> 


                <input
                    className='btn_ticket' 
                    type="submit"
                    value="Envoyer le ticket"
                    
                />
            </form>

            <p>*N.A. : non applicable</p>

            <h2>Vos réclamations</h2>
            
            { allUserTickets && salles && produits &&
                <ItemList
                    name="tickets"
                    data={tickets}
                    keys={keys}
                    headers={headers}
                />
            }

        </div>
    );
};

export default Complaint;