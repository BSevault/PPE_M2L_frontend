import axios from "axios";
import { useEffect, useState } from "react";

const CBE_old = () => {
    const [salles, setSalles] = useState();

    const getAllSalles = async () => {
        const result = await axios.get('http://localhost:3001/salles/all');
        console.log(result);
        console.log(Object.values(result.data.success));
        setSalles(result.data.success);
    }

    const createSalle = async () => {
        const result = await axios.post(
            'http://localhost:3001/salles/',
            {
                "nom": "salle de bob",
                "desc": "test aaaaaaaaaaaa",
                "capa": 30,
                "prix": 12.1,
                "is_active": 1
            }
        );
        console.log(result.data);
    }

    // will activate at page loading
    useEffect(() => {
        getAllSalles();
        // createSalle();
    }, [])

    // option pour le cas sans 'salles &&'
    // if (!salles) return (
    //     <div className="loading">loading...</div>
    // )

    return  (
         <div className="connexion-backend">
            <ul>
                { salles &&
                    salles.map((salle) => (
                        <li key={salle.id}> { salle.nom }</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default CBE_old;