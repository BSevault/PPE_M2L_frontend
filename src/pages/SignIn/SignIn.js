import axios from "axios";
import { useState, useRef } from "react";
import GenericForm from "../../components/GenericForm/GenericForm";

const SignIn = () => {
  const signIntext = useRef();

  const [toSend, setToSend] = useState([
    { value: "", place: "Nom", id: "nom", type: "text" },
    { value: "", place: "Prénom", id: "prenom", type: "text" },
    { value: "", place: "Date de naissance", id: "ddn", type: "date" },
    { value: "", place: "Adresse", id: "adresse", type: "text" },
    { value: "", place: "Téléphone", id: "tel", type: "text" },
    { value: "", place: "Email", id: "email", type: "text" },
    { value: "", place: "Mot de passe", id: "pwd", type: "password" },
    {
      value: "",
      place: "Retaper votre Mot de passe",
      id: "verif_pwd",
      type: "password",
    },
  ]);

  const signIn = async (e) => {
    e.preventDefault();
    const adress = "http://localhost:3001/users";
    const content = {
      nom: toSend[0].value,
      prenom: toSend[1].value,
      email: toSend[5].value,
      tel: toSend[4].value,
      password: toSend[7].value,
      ddn: toSend[2].value,
      adresse: toSend[3].value,
    };

    const result = await axios.post(adress, content);

    if (result.status === 200) {
      signIntext.current.innerText = "Vous etes bien inscrit";
    } else {
      signIntext.current.innerText = "Nous avons recontré un problème";
    }
  };

  return (
    <div className="signin">
      <GenericForm
        toSend={toSend}
        setToSend={setToSend}
        input={<input type="submit" onClick={signIn} value="Envoyer !" />}
        par={<p className="signin_ok" ref={signIntext}></p>}
      />
    </div>
  );
};

export default SignIn;
