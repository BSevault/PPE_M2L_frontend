import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios/useAxios";



const ConnecBackEnd = () => {
    const [salles, setSalles] = useState();
    const method = 'get';
    const adress = 'http://localhost:3001/salles/all';
    const content = {/* if post put object here */};
  
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