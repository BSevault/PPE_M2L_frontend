
<<<<<<< HEAD
import './GenericFormSimple.css';

const GenericFormSimple = ({ props, handleSubmit }) => {
=======
import { useState } from 'react';
import './GenericFormSimple.css';

const GenericFormSimple = ({ props }) => {
>>>>>>> 7810980a5ffafd06e7009d5eb59508ae24fa2f8d
    const { toSend, setToSend } = props;
    const items = Object.keys(toSend);

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
<<<<<<< HEAD
        <form className="generic-form-simple" onSubmit={handleSubmit}>
=======
        <form className="generic-form-simple">
>>>>>>> 7810980a5ffafd06e7009d5eb59508ae24fa2f8d
            {
                items.map((item, index) => (
                    <div className="mapped-input" key={`formKey-${index}`}>
                        <label htmlFor={item} className='input-label'>{`Votre ${item}:`}</label>
                        <input
                            type='text'
                            name={item}
                            id={item}
                            placeholder={item}
                            value={toSend[item]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))
            }
<<<<<<< HEAD
            <button type='submit'>Envoyer !</button >
=======
            <button type='submit' onClick={() => (console.log('clické!'))}>Envoyer !</button >
>>>>>>> 7810980a5ffafd06e7009d5eb59508ae24fa2f8d
        </form>
    );
}

export default GenericFormSimple;