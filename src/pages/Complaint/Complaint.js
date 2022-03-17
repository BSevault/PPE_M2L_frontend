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
    // contexte d'authentification
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

    // réference aux valeurs du nouveau ticket créé
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
    const [solvedTickets, setSolvedTickets] = useState();
    
    // on définit les states des noms des salles et des produits à afficher dans les select
    const [nom_salle, setNom_salle] = useState([]);
    const [nom_produit, setNom_produit] = useState([]);

    // on définit le compteur de charactères du message
    const [charCounter, setCharCounter] = useState(0);

    // on définit un message si il n'y a pas de ticket 
    let message = '';
    let resolvedMessage = '';

    // pour formatter les dates avant de les envoyer dnas la BDD
    const dateFormatToDB = (date) => {
        let jour = new Date(date).toLocaleString('en-GB').split(',')[0].split("/");
        jour = `${jour[2]}-${jour[1]}-${jour[0]}`;
        return jour;
    }
    // pour formater les dates venant de la BDD
    const dateFormatFromDB = (date) => {
        let jour = new Date(date).toLocaleString('en-GB').split(',')[0].split("/");
        jour = `${jour[0]}/${jour[1]}/${jour[2]}`;
        return jour;
    }

    // on récupère les tickets de la requête et on les tri selon qu'ils sont résolus ou non
    useEffect( () => {
        if(allUserTickets) {
            setTickets(allUserTickets?.success.filter( (ticket) => ticket.is_resolved === 0 ));
            setSolvedTickets(allUserTickets?.success.filter( (ticket) => ticket.is_resolved === 1 ));
        }
    }, [allUserTickets]);

    // on formate les dates avant de les afficher
    useEffect( ()=> {
        if (tickets && solvedTickets) {
            // on formate les dates => dd/mm/yyy
            tickets?.forEach( (ticket) => {
                if (ticket["date_ticket"][2] !== '/') {
                    ticket["date_ticket"] = dateFormatFromDB(ticket["date_ticket"]);
                    ticket["date_probleme"] = dateFormatFromDB(ticket["date_probleme"]);
                }
            }); 
            solvedTickets?.forEach( (ticket) => {
                if (ticket["date_ticket"][2] !== '/') {
                    ticket["date_ticket"] = dateFormatFromDB(ticket["date_ticket"]);
                    ticket["date_probleme"] = dateFormatFromDB(ticket["date_probleme"]);
                }
            });
        }
    }
    ,[tickets, solvedTickets]);

    if (tickets?.length < 1) message = "Vous n'avez pas de réclamations en cours";
    if (solvedTickets?.length < 1) resolvedMessage = "Vous n'avez pas de réclamations traitées";

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
    }

    // compteur de caractères du message du ticket
    const charCount = (e) => setCharCounter(e.target.value.length);

    // quand on clique sur une date du calendrier
    const selectDay = (e) => {
        // on set la date
        setJourSelected(dateFormatToDB (e));
    }

     // on stocke le jour cliqué sur le calendrier
    const [ jourSelected, setJourSelected] = useState(dateFormatToDB(startDate));

    const displaySendMessage = () => {
        const sendMessage = document.getElementById('send-message');
        sendMessage.style.opacity=1;
        setTimeout( () => sendMessage.style.opacity=0, 3000);
    }

    const sendTicket = async (e) => {
        e.preventDefault();
        let id_newTicket = '';
         
        try {
            const send = await axios.post(`http://localhost:3001/users/${user.id}/tickets`,
                {date_probleme: dateFormatToDB(jourSelected), description: description.current.value, id_user: user.id, id_salle: parseInt(id_salle.current.value)+1, id_produit: parseInt(id_produit.current.value)+1});
            id_newTicket = send.data.success[0]['id'];
        } catch (error) {
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
        
        setTickets(prevstate => [...prevstate, newTicket]);

        displaySendMessage();

    }

    // rendu
    return (
        <div id="complaint">
            <h1>Réclamations</h1>
            <h2>Faire une réclamation</h2>

            <form id="create-ticket-form" onSubmit={sendTicket}>

                <div id='form-container'>
                    <div>
                        <p>Date de survenue du problème : </p>
                        <Calendar 
                            maxDate={startDate}
                            onClickDay={selectDay}
                            tileDisabled={({date, view}) => {
                                if( (view === 'month' && date.getDay() === 0) || (view === 'month' && date.getDay() === 6)) return true;
                            }}
                        />
                    </div>
                    <div id="selects-container">
                        <div id="selects">
                            { salles &&
                                <ScrollSelect 
                                    id="salles"
                                    name="salles"
                                    label="Salle concernée (optionnel)"
                                    values={nom_salle.slice(1)}
                                    ref={id_salle}
                                />
                            }
    
                            { produits && 
                                <ScrollSelect
                                    id="produits"
                                    name="produits"
                                    label="Produit concerné (optionnel)"
                                    values={nom_produit.slice(1)}
                                    ref={id_produit}
                                />
                            }
                        </div>
                        <span className='comment-span'>*N.A. : non applicable</span>
                        <div id='description-container'>
                            <label htmlFor="description">
                                Description du problème : <br />
                                <span className='desc-comment-span'>1000 caractères max.</span>                        
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                maxLength={1000}
                                required
                                ref={description}
                                onChange={charCount}
                            ></textarea>
                            <span id='char-counter'>{charCounter}/1000</span>
                            <div id='submit-container'>
                                <input id='submit-input'
                                    className='btn_ticket' 
                                    type="submit"
                                    value="Envoyer le ticket"
                        
                                />
                                <span id='send-message'>Votre ticket est envoyé !</span>
                            </div>
                        </div>
                    </div>
                </div>  
            </form>

            

            <h2>Vos réclamations en cours</h2>
            
            { allUserTickets && salles && produits &&
                <>
                    <ItemList
                        name="tickets"
                        data={tickets}
                        keys={keys}
                        headers={headers}
                    />
                    <p className='if-empty-message'>{message}</p>
                </>
            }

            <h2>Vos réclamations traitées</h2>
            
            { allUserTickets && salles && produits &&
                <>
                    <ItemList
                        name="solvedTickets"
                        data={solvedTickets}
                        keys={keys}
                        headers={headers}
                    />
                    <p className='if-empty-message'>{resolvedMessage}</p>
                </>
            }
        </div>
    );
};

export default Complaint;