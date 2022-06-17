import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useAuth } from '../../components/contexts/AuthContext';

import './Login.css'

const Login = () => {
    const { setUser, endpoint } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPasswordUser] = useState();
    const [redirect, setRedirect] = useState(false);

    const inputEmail = useRef();
    const inputPwd = useRef();

    let messageError = useRef();

    const submitLogIn = async (e) => {
        e.preventDefault();
        console.log(endpoint);
        const result = await axios.post(endpoint + '/users/login', {
            email,
            password
        },
            { withCredentials: true }
        )
            .catch((error) => {

                // on traite les erreurs en cas de mauvais login ou pwd
                if (error.response.status === 401) {
                    messageError.current.innerText = "⚠️ Email ou mot de passe invalide !";
                    inputEmail.current.value = '';
                    inputPwd.current.value = '';
                }
            });

        // si tout ce passe bien on set "redirect=true" et on set le User avec les données
        if (result.data.success) {
            setRedirect(true);
        }

        setUser(result.data.success);
    };

    // fait la redirection vers Home une fois le user logger si "redirec=true"
    if (redirect) {
        navigate('/');
    }

    // ajoute une classe quand le curseur est dans un input text
    const addActiveInput = (e) => {
        if (e.target.value !== "") {
            e.target.parentNode.classList.add("active_input");
            messageError.current.innerText = "";
        } else if (e.target.value === "") {
            e.target.parentNode.classList.remove("active_input");
        }
    }


    return (
        <div className="login">
            <h1>Se connecter à votre compte M2L</h1>
            <form action="_POST" onSubmit={submitLogIn} id="form_login">
                <div className="input_form">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={e => setEmail(e.target.value)} onInput={e => addActiveInput(e)} ref={inputEmail} required />
                </div>
                <div className="input_form">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={e => setPasswordUser(e.target.value)} onInput={e => addActiveInput(e)} ref={inputPwd} required />
                </div>
                <input type="submit" value="Login" id='submit' />
            </form>
            <p style={{color: "black", padding: "10px 0 0 0"}}>
                Vous avez oublié votre mot de passe ? 
                <Link to={"/resetpwd"} style={{visited : "none", textDecoration: "none", color: "var(--blue)"}}> Cliquez ici.</Link>
            </p>
            <p ref={messageError}></p>
        </div>
    );
}

export default Login;