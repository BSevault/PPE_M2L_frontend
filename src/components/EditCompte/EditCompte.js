import useAxios from "../../hooks/useAxios/useAxios";
import { useEffect, useState } from 'react';
import GenericFormSimple from "../GenericFormSimple/GenericFormSimple";

const EditCompte = ({ user }) => {
    // copy les données utilisateurs moins les données sensibles
    const userFiltered = { ...user };
    ['id', 'is_active', 'is_admin', 'ddn', 'id_ligue'].forEach(e => delete userFiltered[e]);

    // définis les données qui vont transiter sur le back
    const [toSend, setToSend] = useState(userFiltered);
    const [content, setContent] = useState();
    const [adress, setAdress] = useState();
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');

    // requête via custom hook, active uniquement à partir du moment ou "adress" est non null
    const { response, error } = useAxios('put', adress, content);

    // Données du formulaire
    const genericFormData = {
        "toSend": toSend,
        "setToSend": setToSend,
    }

    // Quand le bouton "envoyez" est cliqué (sur genericForm)
    const handleSubmit = (e) => {
        // prevent page reloading
        e.preventDefault();

        // update l'objet utilisateur avec les données du formulaire
        Object.keys(toSend).forEach((key) => {
            user[key] = toSend[key];
        })

        // setup le body à envoyer
        setContent({
            "nom": user.nom,
            "prenom": user.prenom,
            "email": user.email,
            "tel": user.tel,
            "ddn": user.ddn.split('T')[0],
            "adresse": user.adresse
        });

        // setup l'adresse, déclenche le hook axios & la requête
        setAdress(`/users/${user.id}`);

    }

    // Définis si le fetch a été successful ou pas
    useEffect(() => {
        if (response && response.success) setMessageSuccess('Compte mis à jour !');
        if (error) setMessageError('Une erreur est survenue, wups');
    }, [response, error]);


    return (
        <div className="edit-compte">
            <GenericFormSimple props={genericFormData} handleSubmit={handleSubmit} messageSuccess={messageSuccess} messageError={messageError} />
        </div>
    );
};

export default EditCompte;