import { useState } from "react";
import GenericForm from "../../components/GenericForm/GenericForm";


const SignIn = () => {

    const [toSend, setToSend] = useState([
        {value: '', place: "Nom", id: "nom", type: 'text'},
        {value: '', place: "Prénom", id: "prenom", type: 'text'},
        {value: '', place: "Date de naissance", id: "ddn", type: 'date'},
        {value: '', place: "Adresse", id: "adresse", type: 'text'},
        {value: '', place: "Email", id: "email", type: 'text'},
        {value: '', place: "Mot de passe", id: "pwd", type: 'password'},
        {value: '', place: "Retaper votre Mot de passe", id: "verif_pwd", type: 'password'}
    ]);

    // on peux éventuellement faire une thank you page
    const genericFormData = {
        "toSend": toSend,
        "setToSend": setToSend,
        "email": 'sawisem904@porjoton.com',
        "subject": 'Mail reçu depuis le site web Hair Prestige !',
        "redirect": 'http://localhost:3000/photos'
    }


    return (  
        <div className="signin">
            <GenericForm props={genericFormData} />
        </div>
    );
}
 
export default SignIn;