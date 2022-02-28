
import './GenericFormSimple.css';

const GenericFormSimple = ({ props, handleSubmit, messageSuccess, messageError }) => {
    const { toSend, setToSend } = props;
    const items = Object.keys(toSend);

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
        <form className="generic-form-simple" onSubmit={handleSubmit}>
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
            <button type='submit'>Envoyer !</button >
            <div className="submit-message">
                <p className="success">{messageSuccess}</p>
                <p className="error">{messageError}</p>
            </div>
        </form>
    );
}

export default GenericFormSimple;