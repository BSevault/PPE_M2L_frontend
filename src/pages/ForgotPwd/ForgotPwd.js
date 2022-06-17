import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../components/contexts/AuthContext";
import GenericForm from "../../components/GenericForm/GenericForm";

const ForgotPwd = () => {
  const { endpoint } = useAuth();
  const [userId, setUserId] = useState();
  const [emailEnter, setEmailEnter] = useState(false);
  const [msg, setMsg] = useState(true);
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const pwdVerif = useRef();
  const pwd = useRef();
  const email = useRef();

  const [toSend, setToSend] = useState([
    { value: "", place: "Email", id: "email", type: "text", textRef: email },
  ]);

  const [newPwd, setNewPwd] = useState([
    {
      value: "",
      place: "Nouveau mot de passe*",
      id: "pwd",
      type: "password",
      textRef: pwd,
    },
    {
      value: "",
      place: "Confirmer votre nouveau mot de passe",
      id: "verif_pwd",
      type: "password",
      textRef: pwdVerif,
    },
  ]);

  const checkEmail = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      `${endpoint}/users/reset/pwd`,
      { email: toSend[0].value },
      { withCredentials: true }
    );

    if (result.data.success !== undefined) {
        setUserId(result.data.success);
        setEmailEnter(true);
    } else {
        setMsg(false);
        setMessage("Il n'y a pas de compte avec cette adresse mail");
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }
  };

    const handlePwd = async (e) => {
    e.preventDefault();
    const result = await axios.put(`${endpoint}/users/reset/pwd`, {user_id: userId.id, new_password: pwdVerif.current.value}, { withCredentials: true });

    if (result.status === 200) {
        setEmailEnter(false);
        setMsg(false);
        setMessage("Votre mot de passe a bien été changé");
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }

}

  useEffect(() => {
    if (emailEnter) {
      // REGEX pour pwd
      const patternPwd = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})"
      );

      if (patternPwd.test(pwd.current.value)) {
        pwd.current.style.borderBottom = "solid 2px #43aa8b";
        pwd.current.pwdIsOk = true;
      } else {
        pwd.current.style.borderBottom = "solid 2px red";
        pwd.current.pwdIsOk = false;
      }

      if (
        pwd.current.value === pwdVerif.current.value &&
        pwdVerif.current.value !== ""
      ) {
        pwdVerif.current.style.borderBottom = "solid 2px #43aa8b";
        pwdVerif.current.pwdVerifIsOk = true;
      } else {
        pwdVerif.current.style.borderBottom = "solid 2px red";
        pwdVerif.current.pwdVerifIsOk = false;
      }
    }
  });

  return (
    <div className="forgot_pwd">
        <h1 style={{textAlign: "center", margin: "20px"}}>Réinitialiser votre mot de passe</h1>

    {
        msg ? (
            !emailEnter ? (
                <>
                    <GenericForm toSend={toSend} setToSend={setToSend} input={<input type="submit" value="Envoyer !" onClick={checkEmail} style={{backgroundColor: "var(--gold)"}}/>}/>
                </>
            ) : (
                <>
                    <GenericForm toSend={newPwd} setToSend={setNewPwd} par={<p className="regle_mdp">
            *Mini 12 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1
            caractère spécial
          </p>} input={<input type="submit" value="Envoyer !" onClick={handlePwd} style={{backgroundColor: "var(--gold)"}} />}/>
                </>
            )
        ) : (
        <p style={{textAlign: "center", margin: "20px"}}>{message}</p>
        )
    }
    </div>
  );
};

export default ForgotPwd;
