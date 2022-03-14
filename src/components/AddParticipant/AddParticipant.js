import { useState } from 'react';
import './AddParticipant.css';
import ButtonBasic from "../ButtonBasic/ButtonBasic";

const AddParticipant = ({ partiEmail, setPartiEmail, handleSubmit }) => {

    const handleChange = (e) => {
        setPartiEmail(e.target.value);
    };

    

    return (
        <div className="add-participant">
            <h2>Ajouter un participant</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-email">
                    <label htmlFor='email' className='input-label-participant' />
                    <input
                        type='text'
                        name='email'
                        id='email'
                        placeholder='email@exemple.bob'
                        value={partiEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <ButtonBasic
                    handleClick={() => handleSubmit}
                    buttonInnerText="Ajouter"
                    style={{ width: '200px' }}
                />
            </form>
        </div>
    );
}

export default AddParticipant;