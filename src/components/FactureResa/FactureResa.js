import { useEffect, useState, useRef } from "react";
import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../ItemList/ItemList";
import PdfCreator from '../PdfCreator/PdfCreator';

import './FactureResa.css';

const FactureResa = ({ id_resa, resaSalle }) => {
    const [ adressPaiement, setAdressPaiement ] = useState();
    const [ colorTotal, setColorTotal ] = useState();
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
            totalFacture.current.total = `Total : ${(totalFacture.current.total).toFixed(2)} €`;
        }

        if (!resaSalle.is_paid) {
            setColorTotal({backgroundColor: "rgba(214, 76, 76, 0.548)"});
            totalFacture.current.total = `Reste à payer - ${totalFacture.current.total}`;
        }
    }, [id_resa, allPayments])    

    return (  
        <div className="facture_resa">
            <ItemList name={'facture'} data={allPayments?.success} keys={keys} headers={headers} colorstyle={`blue`}/>
            <div className="btn_dl_total">
                <PdfCreator className="pdf_creator" allPayments={allPayments?.success} resaSalle={resaSalle} />
                <p className="total_facture" ref={totalFacture} style={colorTotal} >{totalFacture?.current?.total}</p>
            </div>
        </div>
    );
}
 
export default FactureResa;