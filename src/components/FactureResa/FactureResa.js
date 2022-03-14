import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios/useAxios";
import { useAuth } from "../contexts/AuthContext";
import ItemList from "../ItemList/ItemList";

import './FactureResa.css';

const FactureResa = ({ id_resa }) => {
    const { user } = useAuth();
    const [adressPaiement, setAdressPaiement] = useState();
    const [paymentResa, setPaymentResa] = useState();
    let sumTotal = 0;

    const keys = ['nom_produit', 'qte', 'total'];
    const headers = ['Produits commandés', 'Quantité', 'Total (€)']

    // const { response : allResa } = useAxios('get', `http://localhost:3001/users/${user.id}/reservation/`)

    
    const { response : allPayments } = useAxios('get', adressPaiement);

    useEffect(() => {
        setAdressPaiement(`http://localhost:3001/users/paiements/${id_resa}`);
        // setPaymentResa(allPayments?.success);
    }, [])

    console.log(allPayments);
    if (allPayments) {
        allPayments.success.forEach((paiement) => {
            sumTotal = sumTotal + paiement.total;
        });
    }
    
    

    return (  
        <div className="facture_resa">
            <ItemList name={'facture'} data={allPayments?.success} keys={keys} headers={headers} />
            <p className="total_facture">Total : {sumTotal}€</p>
        </div>
    );
}
 
export default FactureResa;