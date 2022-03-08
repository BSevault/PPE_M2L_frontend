/**
Component that recieve a list of choice from props with the names 'services'
Display the list as a select element
handleSubmit as placeholder for further customizations
 */

import './ScrollSelect.css'

const ScrollSelect = ({ name, label, values }) => {

    const handleSelect = (e) => {
        console.log(e.target.value);
    }


    return (
        <div className="scrollSelect">
            <label htmlFor="service-select">{`${label} `}</label>

            <select name={name} id={name} onChange={(e) => handleSelect(e)}>
                <option value="">--</option>
                {
                    values.map((value, index) => (
                        <option key={`${index}-${value}`} value={index+1}>{value}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default ScrollSelect;