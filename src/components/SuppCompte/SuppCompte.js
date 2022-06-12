import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../../hooks/useAxios/useAxios";
import ButtonBasic from "../ButtonBasic/ButtonBasic";
import GenericForm from "../GenericForm/GenericForm";

const SuppCompte = () => {
  const { user, checkLoginStatus, endpoint } = useAuth();

  const emailSupp = useRef("");
  const [method, setMethod] = useState("patch");
  const [adress, setAdress] = useState();
  const [toSend, setToSend] = useState([
    {
      value: "",
      place: "Confirmer votre email",
      id: "email_supp",
      type: "text",
      textRef: emailSupp
    },
  ]);
  const [suppError, setSuppError] = useState();
  const pStyle = {
    margin: "20px",
    padding: "8px",
    color: "var(--blue)",
    "font-weight": "600",
    "font-style": "italic",
  };

  const { response } = useAxios(method, adress);

  const inactiveCompte = (e) => {
    //vérifie que l'email en DB == email taper par le user
    if (user.email === toSend[0].value) {
      //on active le toggle isActive en back pour inactive le user
      setAdress(`${endpoint}/users/${user.id}/active`);
    } else {
      //on enleve le refresh si le mail correspond pas et on set un message
      e.preventDefault();
      emailSupp.current.value = "";
      setSuppError("L'email ne correspond pas au compte.");
    }
  };

  useEffect(() => {
    //si la reponse = desactivé on logout le user
    if (response?.success === "Le compte a été desactivé") {
      setMethod("get");
      setAdress(`${endpoint}/users/logout`);
    }
    //on check bien que la session est kill, donc le context user est reset
    checkLoginStatus();
  }, [response]);

  return (
    <div className="supp_compte">
      <GenericForm
        toSend={toSend}
        setToSend={setToSend}
        input={
          <ButtonBasic
            buttonInnerText="Supprimer le compte"
            colorstyle="red"
            style={{ width: "200px" }}
            handleClick={inactiveCompte}
          />
        }
        par={<p style={pStyle}>{suppError}</p>}
      />
    </div>
  );
};

export default SuppCompte;
