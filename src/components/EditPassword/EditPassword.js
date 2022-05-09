import useAxios from "../../hooks/useAxios/useAxios";
import { useEffect, useState } from 'react';
import GenericFormSimple from "../GenericFormSimple/GenericFormSimple";

const EditPassword = ({ user }) => {
    // définis les données qui vont transiter sur le back
    const [toSend, setToSend] = useState({
        "old_password": "",
        "new_password": "",
        "verify_password": ""
    });

    const [content, setContent] = useState();
    const [adress, setAdress] = useState();
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');

    // requête via custom hook, active uniquement à partir du moment ou "adress" est non null
    const { response, error } = useAxios('post', adress, content);

    // Données du formulaire
    const genericFormData = {
        "toSend": toSend,
        "setToSend": setToSend,
    }

    // vérifie que le password avec son duplicata
    const checkPsw = ( psw, verifpsw ) => {

        const patternPwd = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          );
    
        return (patternPwd.test(psw) && (psw === verifpsw));
    
    }

    // Quand le bouton "envoyez" est cliqué (sur genericForm)
    const handleSubmit = (e) => {
        // prevent page reloading
        e.preventDefault();

        const passValid = checkPsw(toSend['new_password'], toSend['verify_password'])

        // setup l'adresse, déclenche le hook axios & la requête après avoir prep data
        if (passValid) {
            setContent({
                "old_password": toSend.old_password,
                "new_password": toSend.new_password
            })
            console.log(content);
            setAdress(`/users/${user.id}`);
        } else {
            setMessageError('Mot(s) de passe(s) invalide(s), have fun finding which part huehue');
        }
        

    }

    // Définis si le fetch a été successful ou pas
    useEffect(() => {
        if (response && response.success.affectedRows === 1) setMessageSuccess('Compte mis à jour !');
        if (response && response.success.affectedRows === 0) setMessageError('Ancien mot de passe invalide');
        if (error) setMessageError('Une erreur est survenue, wups');
    }, [response, error]);

    return (
        <div className="edit-password">
            <GenericFormSimple props={genericFormData} handleSubmit={handleSubmit} messageSuccess={messageSuccess} messageError={messageError} type='password' />
        </div>
    );
};

export default EditPassword;