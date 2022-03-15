import { useEffect, useState, useRef } from "react";
import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../ItemList/ItemList";

import './FactureResa.css';

const FactureResa = ({ id_resa }) => {
    const [adressPaiement, setAdressPaiement] = useState();
    const totalFacture = useRef();
    const keys = ['nom_produit', 'qte', 'total'];
    const headers = ['Produits commandés']

    const { response : allPayments } = useAxios('get', adressPaiement);

    useEffect(() => {
        setAdressPaiement(`http://localhost:3001/users/paiements/${id_resa}`);

        if (allPayments) {
            totalFacture.current.total = 0;

            allPayments?.success.forEach((paiement) => {
                totalFacture.current.total = (totalFacture.current.total + paiement.total);
            });
            totalFacture.current.total = (totalFacture.current.total).toFixed(2);
        }

    }, [id_resa, allPayments])

    console.log(allPayments);
        
    

    return (  
        <div className="facture_resa">
            <ItemList name={'facture'} data={allPayments?.success} keys={keys} headers={headers} colorstyle={`blue`}/>
            <p className="total_facture" ref={totalFacture} >Total : {totalFacture?.current?.total} €</p>
        </div>
    );
}
 
export default FactureResa;