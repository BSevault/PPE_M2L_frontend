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


    return (  
        <div className="login">
            <h1>Se connecter à votre compte M2L</h1>
            <form action="_POST" onClick={e => {e.preventDefault()}} id="form_login">
                <input type="text" name="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} ref={inputEmail} required/>
                <input type="password" name="password" id="password" placeholder="Password" onChange={e => setPasswordUser(e.target.value)} ref={inputPwd} required/>
                <input type="submit" value="Login" id='submit' onClick={submitLogIn}/>
            </form>
            <p ref={messageError}></p>
        </div>
    );
}
 
export default Login;