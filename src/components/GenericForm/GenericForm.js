// si on décide d'utiliser emailjs
// https://dev.to/daliboru/how-to-send-emails-from-a-form-in-react-emailjs-27d1

import { useState } from 'react';
import './GenericForm.css';

const GenericForm = ({ props }) => {
    const [message, setMessage] = useState('');
    const { toSend, setToSend, email, subject, redirect } = props;
    const items = Object.keys(toSend);

    const handleChange = (e, index) => {
        console.log(e);
        const id = e.target.name;
        // console.log(id);

        const indexSend = toSend.findIndex((elem) => elem.id === id );
        // console.log(indexSend);
        setToSend(...toSend, toSend[indexSend].value = e.target.value );
    };

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }   

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
                        <label htmlFor={item.id} className='input-label'>{`${item.place}:`}</label>
                        <input
                            type={item.type}
                            name={item.id}
                            id={item.id}
                            placeholder={item.place}
                            // value={item.value}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                    </div>
                ))
            }
            <div className="form-message">
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
            </div>
            <button type='submit' onClick={() => (console.log(toSend))}>Envoyer !</button >
        </form>
    );
}

export default GenericForm;