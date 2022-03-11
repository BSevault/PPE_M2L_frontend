import { createContext, useContext, useEffect, useState } from "react";
import useAxios from '../../hooks/useAxios/useAxios';


const SallesContext = createContext();
export const useSalles = () => useContext(SallesContext);

const SallesContextProvider = ({ children }) => {
    const [ allReservations, setAllReservations ] = useState();
    const [ dateResevedSalle, setDateReservedSalle] = useState();

    const {response : salles} = useAxios('get', 'http://localhost:3001/salles/');

    const {response: reservations} = useAxios('get', 'http://localhost:3001/users/all/reservations/');

    useEffect( () => {
        setAllReservations(reservations); //set toutes les reservations dans le state allReservations
    }, [reservations])

    const value = {

    };


    return <SallesContextProvider value={value}>
        {children}
    </SallesContextProvider>
}
 
export default SallesContextProvider;