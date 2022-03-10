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

  const handleChange = (e) => {
    const id = e.target.name;
    const indexSend = toSend2.findIndex((elem) => elem.id === id);

    if (indexSend !== -1) {
      let newArray = toSend2.slice();
      newArray[indexSend].value = e.target.value;
      setToSend2(newArray);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();

    const adress = "http://localhost:3001/users";
    const content = {
      nom: toSend[0].value,
      prenom: toSend[1].value,
      email: toSend2[0].value,
      tel: toSend[4].value,
      password: toSend2[2].value,
      ddn: toSend[2].value.split('T')[0],
      adresse: toSend[3].value,
    };

    if (
      email.current.emailIsOk &&
      pwd.current.pwdIsOk &&
      pwdVerif.current.pwdVerifIsOk
    ) {
      const result = await axios.post(adress, content, { withCredentials: true }).catch((error) => {
        if (error.response.status === 401) {
          signInText.current.innerText =
            "⚠️ Un compte existe déjà avec cet email";
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
  
  useCheckSignIn(email, pwd, pwdVerif);
   

  return (
    <div className="signin">
      <h1>Inscription au portail M2L</h1>

      <div className="signin_form">
        <GenericForm toSend={toSend} setToSend={setToSend} />

        <div className="generic_form">
          {toSend2.map((item, index) => (
            <div className="mapped_input" key={`formKey-${index}`}>
              <label htmlFor={item.id} className="input-label">
                {item.place}
              </label>
              <input
                type={item.type}
                name={item.id}
                id={item.id}
                value={item.value}
                onChange={(e) => handleChange(e)}
                ref={item.textRef}
                required
              />
            </div>
          ))}

          <input type="submit" onClick={signIn} value="Envoyer !" />
          <p className="signin_ok" ref={signInText}></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;