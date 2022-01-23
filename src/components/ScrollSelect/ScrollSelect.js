/**
Component that receive a list of choice from props with the names 'services'
Display the list as a select element
handleSubmit as placeholder for further customizations
 */

import './ScrollSelect.css'

const ScrollSelect = ({ services }) => {

    const handleSelect = (e) => {
        console.log(e.target.value);
    }


    return (
        <div className="scrollSelect">
            <label for="service-select">Choose a service:</label>

            <select name="pets" id="servie-select" onChange={(e) => handleSelect(e)}>
                <option value="">--Please choose an option--</option>
                {
                    services.map((service) => (
                        <option key={service} value={service}>{ service }</option>
                    ))
                }
            </select>
        </div>
    );
}

export default ScrollSelect;