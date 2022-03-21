import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../../hooks/useAxios/useAxios";
import ButtonBasic from "../ButtonBasic/ButtonBasic";
import GenericForm from "../GenericForm/GenericForm";

const SuppCompte = () => {
    const { user, checkLoginStatus } = useAuth();

    const [method, setMethod] = useState("patch");
    const [adress, setAdress] = useState();
    const [toSend, setToSend] = useState([
        { value: "", place: "Confirmer votre email", id: "email_supp", type: "text" }
    ]);

    const { response } = useAxios(method, adress)

    const inactiveCompte = (e) => {
        if (user.email === toSend[0].value) {
            console.log(response);
            setAdress(`http://localhost:3001/users/${user.id}/active`);
        }
    }

    useEffect( () => {
        if (response?.success === "Le compte a été desactivé") {
            setMethod("get");
            setAdress(`http://localhost:3001/users/logout`);
        }
        checkLoginStatus();
    }, [response]);
    

    return ( 
        <div className="supp_compte">
            <GenericForm toSend={toSend} setToSend={setToSend} input={<ButtonBasic buttonInnerText="Supprimer le compte" colorstyle="red" style={{width: "200px"}} handleClick={inactiveCompte}/>} />
        </div>
     );
}
 
export default SuppCompte;