import { useEffect, useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import useAxios from "../../hooks/useAxios/useAxios";



const ConnecBackEnd = () => {
    const { endpoint } = useAuth;
    const [salles, setSalles] = useState();
    const method = 'get';
    const adress = endpoint + '/salles/all';
    const content = {/* if post put object here */ };

    const { response, error, loading } = useAxios(method, adress, content);



    useEffect(() => {
        if (error) {
            // display something with because of error
        }

        if (loading) {
            // display something during loading
        }

        if (response) setSalles(response.success);
    }, [response, error, loading])


    return (
        <div className="connexion-backend">
            <ul>
                {salles &&
                    salles.map((salle) => (
                        <li key={salle.id}> {salle.nom}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ConnecBackEnd;