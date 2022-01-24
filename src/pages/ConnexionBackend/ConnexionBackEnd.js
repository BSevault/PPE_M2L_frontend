import axios from "axios";
import { useEffect } from "react";

const ConnexionBackEnd = () => {

    const getAllSalles = async () => {
        const result = await axios.get('http://localhost:3001/salles/all');
        console.log(result);
        console.log(result.data.success[0]);
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
        // getAllSalles();
        createSalle();
    }, [])

    return (
        <div className="connexion-backend">
            connexion backend
        </div>
    );
}

export default ConnexionBackEnd;