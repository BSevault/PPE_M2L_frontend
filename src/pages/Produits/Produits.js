import "./Produits.css";
import ItemList from "../../components/ItemList/ItemList";

const Produits = () => {
    const productsKeys = ["nom_produit", "description", "qte_dispo", "prix"];
    const productsHeader = ["Produit", "Description", "Quantité disponible", "Prix"]
    return (
        <div id="products-wrapper">
            <div id="products-content">
            <h1>Nos produits disponibles lors de vos évènements</h1>
                <ItemList
                    name="products"
                    method="get"
                    adress="http://localhost:3001/produits"
                    content={null}
                    keys={productsKeys}
                    headers={productsHeader}
                />
            </div>
        </div>
    );
};

export default Produits;
