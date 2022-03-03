import { useEffect, useState } from "react";
import GenericForm from "../../components/GenericForm/GenericForm";
import "./Contact.css";

const Contact = () => {
    const [toSend, setToSend] = useState([
        { value: "", place: "Nom", id: "nom", type: "text" },
        { value: "", place: "Prénom", id: "prenom", type: "text" },
        { value: "", place: "E-mail", id: "email", type: "text" },
    ]);

    const sendMessage = (e) => {
        e.preventDefault();
        const form = document.getElementById("contact-form").firstChild;
        form.action = "http://cedric.cnam.fr/~pons/NFA016/echo.php";
        form.method = "get";
        console.log(form);
        form.submit();
    };

    return (
        <div id="contact">
            <h1>Nous contacter</h1>
            <div id="contact-form">
                <GenericForm
                    toSend={toSend}
                    setToSend={setToSend}
                    input={
                        <div className="mapped_input">
                            <label htmlFor="message" className="input-label">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="10"
                                cols="5"
                                required
                            />
                        </div>
                    }
                    par={
                        <input
                            type="submit"
                            value="Envoyer"
                            onClick={sendMessage}
                        />
                    }
                />
            </div>
        </div>
    );
};

export default Contact;
