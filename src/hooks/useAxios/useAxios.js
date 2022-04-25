import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/contexts/AuthContext';

const useAxios = (method, adress, content) => {
    const { endpoint } = useAuth();
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    // tant que ni réponse ni erreur, loading = true
    const [loading, setloading] = useState(true);
    // const endpoint = 'http://localhost:3001';
    // const endpoint = 'http://15.237.109.149:3001';

    const fetchData = () => {
        if (adress.charAt(0) == '/') {
            adress = endpoint + adress;
        }
        // == can replace axios, pour tester
        // fetch(adress, {
        //     method: method,
        //     body: content,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     credentials: "same-origin",
        // })
        axios({
            method: method,
            url: adress,
            data: content,
            withCredentials: true
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
        if (adress) fetchData();
        // console.log("useAxios, adress:", adress, "method:", method);
    }, [adress]);

    // console.log(response);
    // custom hook returns value
    return { response, error, loading };
};

export default useAxios;