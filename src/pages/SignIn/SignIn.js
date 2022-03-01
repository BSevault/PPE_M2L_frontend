import axios from "axios";
import { useState, useRef } from "react";
import GenericForm from "../../components/GenericForm/GenericForm";
import useCheckSignIn from "../../hooks/useCheckSignIn/useCheckSignIn";

import "./SignIn.css";

const SignIn = () => {
  const signInText = useRef();

  const pwdVerif = useRef();
  const pwd = useRef();
  const email = useRef();

  const [toSend, setToSend] = useState([
    { value: "", place: "Nom", id: "nom", type: "text" },
    { value: "", place: "Prénom", id: "prenom", type: "text" },
    { value: "", place: "Date de naissance", id: "ddn", type: "date" },
    { value: "", place: "Adresse", id: "adresse", type: "text" },
    { value: "", place: "Téléphone", id: "tel", type: "text" },
  ]);

  const [toSend2, setToSend2] = useState([
    { value: "", place: "Email", id: "email", type: "text", textRef: email },
    {
      value: "",
      place: "Mot de passe",
      id: "pwd",
      type: "password",
      textRef: pwd,
    },
    {
      value: "",
      place: "Retaper votre Mot de passe",
      id: "pwdVerif",
      type: "password",
      textRef: pwdVerif,
    },
  ]);

  const signIn = async (e) => {
    e.preventDefault();

    // données entrées par le User + adresse du backend
    const adress = "http://localhost:3001/users";
    const content = {
      nom: toSend[0].value,
      prenom: toSend[1].value,
      email: toSend2[0].value,
      tel: toSend[4].value,
      password: toSend2[2].value,
      ddn: toSend[2].value.split("T")[0],
      adresse: toSend[3].value,
    };

    // emailIsOk pwdIsOk pwdVerifIsOk = true on envoie les données pour créer le user
    // ces variables sont stocker dans le useRef (current."nomVariable")
    if (
      email.current.emailIsOk &&
      pwd.current.pwdIsOk &&
      pwdVerif.current.pwdVerifIsOk
    ) {
      const result = await axios.post(adress, content).catch((error) => {

        // on traite les erreurs + affiche message dans un <p> prévu pour ça
        if (error.response.status === 401) {
          signInText.current.innerText =
            "⚠️ Un compte existe déjà avec cette email";
        }
      });

      if (result.status === 200) {
        signInText.current.innerText = "Vous êtes bien inscrit";
      }
    } else {
      signInText.current.innerText =
        "⚠️ Il y a un problème avec votre email ou mot de passe. Veuillez les vérifier";
    }
  };

  // custom hook pour check le mail, le pwd et que le pwd = 2eme champ pwd
  useCheckSignIn(email, pwd, pwdVerif);

  return (
    <div className="signin">
      <h1>Inscription au portail M2L</h1>

      <div className="signin_form">
        <GenericForm toSend={toSend} setToSend={setToSend} />
        <GenericForm
          toSend={toSend2}
          setToSend={setToSend2}
          input={<input type="submit" onClick={signIn} value="Envoyer !" />}
          par={<p className="signin_ok" ref={signInText}></p>}
        />
      </div>
    </div>
  );
};

export default SignIn;
