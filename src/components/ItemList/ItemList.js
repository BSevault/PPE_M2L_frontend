import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios/useAxios";
import "./ItemList.css"

// keys : tableau contenant les noms des colonnes de la table listée ; nam : nom de la liste
const ItemList = ({ method, adress, content, keys, name }) => {
    const [items, setItems] = useState();

    const { response, _, loading } = useAxios(method, adress, content);

    useEffect(() => {
        if (response) setItems(response.success);
    }, [loading]);

    console.log(items);

    return (
        <div className={`item-list ${name}-list`}>
            {items &&
                items.map((item) => (
                    <ul className={`item`} key={`item-${item.id}`}>
                        {keys.map((key, index) => (
                            <li key={`item-key-${index}`}> {item[key]} </li>
                        ))}
                    </ul>
                ))}
        </div>
    );
};

export default ItemList;
