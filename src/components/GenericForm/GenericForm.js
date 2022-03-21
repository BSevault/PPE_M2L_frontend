
import './GenericForm.css';

// on génère un form depuis un tableau d'objet "toSend"
const GenericForm = ({ toSend, setToSend, input, par }) => {

    const handleChange = (e) => {
            // on recupère l'id de l'input selectionné 
        const id = e.target.name;
            // on recupère l'index dans toSend             
        const indexSend = toSend.findIndex((elem) => elem.id === id );  
        
        if (indexSend !== -1){
                // on copie le tableau toSend
            let newArray = toSend.slice();
                // on insère la valeur de l'input au bon index dans le nouveau tableau et on setToSend
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
                            ref={item.textRef ? item.textRef : null}
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