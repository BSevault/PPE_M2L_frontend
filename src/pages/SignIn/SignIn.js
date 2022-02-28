import axios from "axios";
import { useState, useRef, useEffect } from "react";
import GenericForm from "../../components/GenericForm/GenericForm";

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
    { value: "", place: "Email", id: "email", type: "text", textRef: email},
    { value: "", place: "Mot de passe", id: "pwd", type: "password", textRef: pwd},
    { value: "", place: "Retaper votre Mot de passe", id: "pwdVerif", type: "password",textRef: pwdVerif}
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

  const addActiveInput = (e) => {
    if (e.target.value !== "") {
      e.target.parentNode.classList.add("active_input");
    } else if (e.target.value === "") {
      e.target.parentNode.classList.remove("active_input");
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
      ddn: toSend[2].value,
      adresse: toSend[3].value,
    };

    if (
      email.current.emailIsOk &&
      email.current.pwdIsOk &&
      email.current.pwdVerifIsOk
    ) {
      const result = await axios.post(adress, content).catch((error) => {
        if (error.response.status === 401) {
          signInText.current.innerText =
            "⚠️ Un compte existe déjà avec cette email";
        }
      });

      if (result.status === 200) {
        signInText.current.innerText = "Vous etes bien inscrit";
      }
    } else {
      signInText.current.innerText =
        "⚠️ Il y a un problème avec votre email ou mot de passe. Veuillez les vérifier";
    }
  };

  useEffect(() => {
    let patternEmail = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (patternEmail.test(email.current.value)) {
      email.current.style.borderBottom = "solid 2px #43aa8b";
      email.current.emailIsOk = true;
    } else {
      email.current.style.borderBottom = "solid 2px red";
      email.current.emailIsOk = false;
    }

    const patternPwd = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (patternPwd.test(pwd.current.value)) {
      pwd.current.style.borderBottom = "solid 2px #43aa8b";
      email.current.pwdIsOk = true;
    } else {
      pwd.current.style.borderBottom = "solid 2px red";
      email.current.pwdIsOk = false;
    }

    if (
      pwd.current.value === pwdVerif.current.value &&
      pwdVerif.current.value !== ""
    ) {
      pwdVerif.current.style.borderBottom = "solid 2px #43aa8b";
      email.current.pwdVerifIsOk = true;
    } else {
      pwdVerif.current.style.borderBottom = "solid 2px red";
      email.current.pwdVerifIsOk = false;
    }
  });

  return (
    <div className="signin">
      <h1>Inscription au portail M2L</h1>

      <div className="signin_form">
        <GenericForm toSend={toSend} setToSend={setToSend} />

        <div className="generic_form">
        {
                toSend2.map((item, index) => (
                    <div className="mapped_input" key={`formKey-${index}`}>
                        <label htmlFor={item.id} className='input-label'>{item.place}</label>
                        <input
                            type={item.type}
                            name={item.id}
                            id={item.id}
                            // placeholder={item.place}
                            value={item.value}
                            onChange={(e) => handleChange(e)}
                            onInput={e => addActiveInput(e)}
                            ref={item.textRef}
                            required
                        />
                    </div>
                ))
            }

          <input type="submit" onClick={signIn} value="Envoyer !" />
          <p className="signin_ok" ref={signInText}></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
