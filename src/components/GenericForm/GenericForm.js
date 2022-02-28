// si on décide d'utiliser emailjs
// https://dev.to/daliboru/how-to-send-emails-from-a-form-in-react-emailjs-27d1

import './GenericForm.css';

const GenericForm = ({ toSend, setToSend, input, par }) => {

    const handleChange = (e) => {

        const id = e.target.name;
        const indexSend = toSend.findIndex((elem) => elem.id === id );
        
        if (indexSend !== -1){
            let newArray = toSend.slice();
            newArray[indexSend].value = e.target.value;
            setToSend(newArray);
        }
    };

    return (
        <form className="generic_form">
            {
                toSend.map((item, index) => (
                    <div className="mapped_input" key={`formKey-${index}`}>
                        <label htmlFor={item.id} className='input-label'>{`${item.place}`}</label>
                        <input
                            type={item.type}
                            name={item.id}
                            id={item.id}
                            value={item.value}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                ))
            }
            { input ? input : <></>}
            { par ? par : <></>}
        </form>
    );
}

export default GenericForm;