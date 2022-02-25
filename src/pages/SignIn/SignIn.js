import axios from "axios";
import { useState, useRef, useEffect } from "react";
import GenericForm from "../../components/GenericForm/GenericForm";

import './SignIn.css';

const SignIn = () => {
  

  const signInText = useRef();

  const [emailIsOk, setEmailIsOk] = useState(false);
  const [pwdIsOk, setPwdIsOk] = useState(false);
  const [pwdVerifIsOk, setPwdVerifIsOk] = useState(false);

  const [toSend, setToSend] = useState([
    { value: "", place: "Nom", id: "nom", type: "text" },
    { value: "", place: "Prénom", id: "prenom", type: "text" },
    { value: "", place: "Date de naissance (jj/mm/yyyy)", id: "ddn", type: "text" },
    { value: "", place: "Adresse", id: "adresse", type: "text" },
    { value: "", place: "Téléphone", id: "tel", type: "text" },
  ]);

  const [toSend2, setToSend2] = useState([
    { value: "", place: "Email", id: "email", type: "text" },
    { value: "", place: "Mot de passe", id: "pwd", type: "password" },
    { value: "", place: "Retaper votre Mot de passe", id: "verif_pwd", type: "password" }
  ]);


  const signIn = async (e) => {
    e.preventDefault();

    const adress = "http://localhost:3001/users";
    const content = {
      nom: toSend[0].value,
      prenom: toSend[1].value,
      email: toSend2[0].value,
      tel: toSend[4].value,
      password: toSend2[2].value,
      ddn: toSend[2].value,
      adresse: toSend[3].value,
    };

    if ( emailIsOk && pwdIsOk && pwdVerifIsOk ) {
      const result = await axios.post(adress, content)
      .catch((error) => {
        if (error.response.status === 401) {
            signInText.current.innerText = "⚠️ Un compte existe déjà avec cette email";
          }
      }) 
     
      if (result.status === 200) {
        signInText.current.innerText = "Vous etes bien inscrit";
      }
    } else {
        signInText.current.innerText = "⚠️ Il y a un problème avec votre email ou mot de passe. Veuillez les vérifier";
    }
  };

  useEffect(() => {
    const pwd = document.getElementById("pwd");
    const pwdVerif = document.getElementById("verif_pwd");
    const email = document.getElementById("email");

    let patternEmail = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (patternEmail.test(email.value)) {
      email.style.borderBottom = "solid 2px #43aa8b";
      setEmailIsOk(true);
    } else {
      email.style.borderBottom = "solid 2px red";
      setEmailIsOk(false);
    }

    const patternPwd = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (patternPwd.test(pwd.value)) {
      pwd.style.borderBottom = "solid 2px #43aa8b";
      setPwdIsOk(true);
    } else {
      pwd.style.borderBottom = "solid 2px red";
      setPwdIsOk(false);
    }

    if (pwd.value === pwdVerif.value && pwdVerif.value !== "" ) {
        pwdVerif.style.border = "solid 2px #43aa8b";
        setPwdVerifIsOk(true);
    } else {
        pwdVerif.style.borderBottom = "solid 2px red";
        setPwdVerifIsOk(false);
    }

  });

  return (
    <div className="signin">
      <h1>Inscription au portail M2L</h1>

      <div className="signin_form">
        <GenericForm
          toSend={toSend}
          setToSend={setToSend}
        />
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
