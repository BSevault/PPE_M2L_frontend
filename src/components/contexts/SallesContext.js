import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";


const SallesContext = createContext();
export const useSalles = () => useContext(SallesContext);

const SallesContextProvider = ({ children }) => {
    const { endpoint } = useAuth();
    const [ allSalles, setAllSalles ] = useState();
    const [ allReservations, setAllReservations ] = useState();
    const [ dateResevedSalle, setDateReservedSalle] = useState();
    const [ resaConfirm, setResaConfirm] = useState();
    const [ jourSelected, setJourSelected] = useState();
    
    const fetchSallesReservations = async () => {
        try {
            const resultSalles = await axios.get(endpoint + '/salles/', { withCredentials: true });
            setAllSalles(resultSalles.data.success);

            const resultReservations = await axios.get(endpoint + '/users/all/reservations/', { withCredentials: true });
            setAllReservations(resultReservations.data.success);

        } catch (error) {
            console.log(error);
        }        
    }

    useEffect( () => {
        fetchSallesReservations();
    }, []);

    // quand on clique sur une date du calendrier
    const selectDay = (e, resa) => {
            // on formate la date dans le bon sens 
        let jour = new Date(e).toLocaleDateString('en-GB').split(',')[0].split("/");
        jour = `${jour[2]}-${jour[1]}-${jour[0]}`;
            // on set la date
        if (jour !== "undefined-undefined-Invalid Date") {
            setJourSelected(jour);
            if (resa) {
                setResaConfirm("");
            }
        }
    }

    const value = {
        allReservations,
        setAllReservations,
        dateResevedSalle,
        setDateReservedSalle,
        resaConfirm, 
        setResaConfirm,
        allSalles,
        setAllSalles,
        selectDay,
        jourSelected,
        setJourSelected
    };

    return <SallesContext.Provider value={value}>
        {children}
    </SallesContext.Provider>
}
 
export default SallesContextProvider;