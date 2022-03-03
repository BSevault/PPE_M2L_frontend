import { useEffect, useState } from "react";
import "./ItemList.css";

// name : nom de la liste
// data : JSON contenant les données à afficher
// keys : tableau contenant les noms des colonnes de la table listée
// headers : tableau contenant les en-têtes de la table listée
const ItemList = ({ name, data, keys, headers }) => {
    const [items, setItems] = useState();
    
    useEffect(() => {
        if (data) setItems(data);
    }, [data]);

    return (
        <div className={`item-list ${name}-list`}>
            <ul className={`item headers ${name}-headers`}>
                {headers &&
                    headers.map((header, index) => (
                        <li key={`${name}-headers-key-${index}`}>{header}</li>
                    ))}
            </ul>

            {items &&
                items.map((item) => (
                    <ul className={`item ${name}-item`} key={`item-${item.id}`}>
                        {keys.map((key, index) => (
                            <li key={`${name}-key-${index}`}> {item[key]} </li>
                        ))}
                    </ul>
                ))}
        </div>
    );
};

export default ItemList;
