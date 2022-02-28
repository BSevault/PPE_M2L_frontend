import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios/useAxios";



const ConnecBackEnd = () => {
    const [salles, setSalles] = useState();
    const method = 'get';
    const adress = 'http://localhost:3001/salles/all';
    const content = {/* if post put object here */};
  
    const { response, error, loading } = useAxios(method, adress, content);

    if (error) {
        // display something because of error
    }

    if (loading) {
        // display something during loading
    }

    useEffect(() => {
        if (response) setSalles(response.success);
    }, [response])


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