import Calendar from "react-calendar";
import useAxios from '../../hooks/useAxios/useAxios';


import 'react-calendar/dist/Calendar.css';
import './SalleResa.css';
import { useEffect } from "react/cjs/react.production.min";

const SalleResa = ( {idSalle, dataResa} ) => {
    
    let arrayDateResa = [];
    dataResa.success.forEach( (resa) => {
        let dateResa = new Date(resa.date_resa).toString();
        
        arrayDateResa.push(dateResa);
    });
    console.log(arrayDateResa);
    
    
       
    
    const selectDay = (e) => {
        let jour = new Date(e).toLocaleString().split(",")[0].split("/");
        jour = `${jour[2]}-${jour[1]}-${jour[0]}`;
        console.log(jour, idSalle);
        
    }

    return (  
        <div className="salle_resa">
            <Calendar onClickDay={selectDay} tileDisabled={({date}) => {
                if(date.getDay() === 0 || date.getDay() === 6) return true;
                    // console.log(date)
                for(let i=0; i < arrayDateResa.length; i++){
                    console.log("--------------")
                    console.log(date)

                    if(date.toJSON() === new Date(arrayDateResa[i]).toJSON()) return true;
                }
                
            }} />
        </div>
    );
}
 
export default SalleResa;