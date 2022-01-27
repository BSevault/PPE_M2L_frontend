import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios/useAxios";



const ConnecBackEnd = () => {
    const [salles, setSalles] = useState();
    const method = 'post';
    const adress = 'http://localhost:3001/salles/all';
    const content = {
        "nom": "Michel",
        "prenom": "Jean",
        "email": "jean.michel@gmail.com",
        "tel": "06.12.32.36.16",
        "password": "test",
        "ddn": "19800620",
        "adresse": "12 avenue des près 78000 Fontainebleau"
    };
  
    const { response, _, loading } = useAxios(method, adress, content);

    useEffect(() => {
        if (response) setSalles(response.success);
    }, [loading])


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

export default ConnecBackEnd;