import "./Produits.css";
import useAxios from "../../hooks/useAxios/useAxios";
import ItemList from "../../components/ItemList/ItemList";

const Produits = () => {
    const productsKeys = ["nom_produit", "description", "qte_dispo", "prix"];
    const productsHeader = ["Produit", "Description", "Quantité disponible", "Prix (€)"]
    return (
        <div id="products-wrapper">
            <div id="products-content">
            <h1>Nos produits disponibles lors de vos évènements</h1>
                { response &&
                    <ItemList
                    name="products"
                    data={response.success}
                    keys={productsKeys}
                    headers={productsHeader}
                /> }
            </div>
        </div>
    );
};

export default Produits;