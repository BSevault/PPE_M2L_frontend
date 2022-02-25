import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import './Login.css'

const Login = ( { setUser } ) => {
    const [email, setEmail] = useState();
    const [password, setPasswordUser] = useState();
    const [redirect, setRedirect] = useState(false);    

    const inputEmail = useRef();
    const inputPwd = useRef();

    let messageError = useRef();

    const submitLogIn = async () => {

        const result = await axios.post('http://localhost:3001/users/login',{
            email,
            password
        })
        .catch((error) => {

            if (error.response.status === 401) {
                messageError.current.innerText = "⚠️ Email ou mot de passe invalide !";
                inputEmail.current.value = '';
                inputPwd.current.value = '';
            }
        });

        if (result.data.success) {
            localStorage.setItem("userId", result.data.success.id)
            setRedirect(true);
        }

        setUser(result.data.success);
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    const addActiveInput = (e) => {
        if (e.target.value !== "") {
            e.target.parentNode.classList.add("active_input");     
        } else if(e.target.value === ""){
            e.target.parentNode.classList.remove("active_input");     
        }
    }

    
    return (  
        <div className="login">
            <h1>Se connecter à votre compte M2L</h1>
            <form action="_POST" onClick={e => {e.preventDefault()}} id="form_login">
                <div className="input_form">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={e => setEmail(e.target.value)} onInput={e => addActiveInput(e)} ref={inputEmail} required/>
                </div>
                <div className="input_form">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={e => setPasswordUser(e.target.value)} onInput={e => addActiveInput(e)} ref={inputPwd} required/>
                </div>
                <input type="submit" value="Login" id='submit' onClick={submitLogIn}/>
            </form>
            <p ref={messageError}></p>
        </div>
    );
}
 
export default Login;