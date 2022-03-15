
import './GenericFormSimple.css';

const GenericFormSimple = ({ props, handleSubmit, messageSuccess, messageError, type }) => {
    const { toSend, setToSend } = props;
    const items = Object.keys(toSend);
    if (!type) type = 'text';

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
        <form className="generic-form-simple" onSubmit={handleSubmit}>
            {
                items.map((item, index) => (
                    <div className="mapped-input" key={`formKey-${index}`}>
                        <label htmlFor={item} className='input-label'>{`${item}:`}</label>
                        <input
                            type={type}
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