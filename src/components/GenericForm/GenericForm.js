// si on décide d'utiliser emailjs
// https://dev.to/daliboru/how-to-send-emails-from-a-form-in-react-emailjs-27d1

import axios from 'axios';
import { useRef, useState } from 'react';
import './GenericForm.css';

const GenericForm = ({ props }) => {
    // const [message, setMessage] = useState('');
    const { toSend, setToSend, email, subject, redirect } = props;
    // const items = Object.keys(toSend);

    const signIntext = useRef();

    const handleChange = (e) => {
        console.log(e);
        const id = e.target.name;

        const indexSend = toSend.findIndex((elem) => elem.id === id );
        
        if (indexSend !== -1){
            let newArray = toSend.slice();
            newArray[indexSend].value = e.target.value;
            setToSend(newArray);
        }

    };

    const signIn = async (e) => {
        e.preventDefault();
        // const method = 'post';
        const adress = 'http://localhost:3001/users';
        const content = {
            nom: toSend[0].value,
            prenom: toSend[1].value,
            email: toSend[5].value,
            tel: toSend[4].value,
            password: toSend[7].value,
            ddn: toSend[2].value,
            adresse: toSend[3].value
        };

        const result = await axios.post(adress, content);

        if (result.status === 200) {
            signIntext.current.innerText = "Vous etes bien inscrit";
        } else {
            signIntext.current.innerText = "Nous avons recontré un problème";
        }
    }

    // const handleMessage = (e) => {
    //     setMessage(e.target.value);
    // }   

    console.log(toSend);

    return (
        <form className="generic-form">
            {/* <input type="hidden" name="_subject" value={subject} />
            <input type="hidden" name="_next" value={redirect} />
            <input type="hidden" name="_template" value="table" /> */}
            {/* <input type="hidden" name="_captcha" value="false"/> */}
            {
                toSend.map((item, index) => (
                    <div className="mapped-input" key={`formKey-${index}`}>
                        <label htmlFor={item.id} className='input-label'>{`${item.place}`}</label>
                        <input
                            type={item.type}
                            name={item.id}
                            id={item.id}
                            placeholder={item.place}
                            value={item.value}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                ))
            }
            {/* <div className="form-message">
                <label htmlFor='message'>Votre message: </label>
                <textarea
                    name='message'
                    id='message'
                    cols='50'
                    rows='10'
                    placeholder='Votre message ici :)'
                    value={message}
                    onChange={handleMessage}
                    required
                />
            </div> */}
            <button type='submit' onClick={signIn}>Envoyer !</button >
            <p className="signin_ok" ref={signIntext} ></p>
        </form>
    );
}

export default GenericForm;