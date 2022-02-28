import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (method, adress, content) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    // tant que ni réponse ni erreur, loading = true
    const [loading, setloading] = useState(true);


    const fetchData = () => {
        axios({
            method: method,
            url: adress,
            data: content
        })
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // console.log(response);
    // custom hook returns value
    return { response, error, loading };
};

export default useAxios;