import { useEffect, useState } from "react";
import "./ItemList.css";


// name : nom de la liste
// data : JSON contenant les données à afficher
// keys : tableau contenant les noms des colonnes de la table listée
// headers : tableau contenant les en-têtes de la table listée
const ItemList = ({ name, data, keys, headers, ExtraContent }) => {
    const [items, setItems] = useState();
    const [targetOpen, setTargetOpen] = useState();

    useEffect(() => {
        if (data) setItems(data);
        // console.log(data);
    }, [data]);

    // toggle extra content at index of click
    const toggle = (index) => {
        setTargetOpen(index);
    }

    // set sextra content if there is one given
    const setExtraContent = (item) => {
        if (ExtraContent) return <ExtraContent buttonInnerText={item.nom} />
    }

    return (
        <div className={`item-list ${name}-list`}>
            <ul className={`item headers ${name}-headers`}>
                {headers &&
                    headers.map((header, index) => (
                        <li key={`${name}-headers-key-${index}`}>{header}</li>
                    ))}
            </ul>

            {items &&
                items.map((item, index) => (
                    <div className="item-list" onClick={() => toggle(index)}>
                        <ul className={`item ${name}-item`} key={`item-${item.id}`} >
                            {keys.map((key, index) => (
                                <li key={`${name}-key-${index}`}> {item[key]} </li>
                            ))}
                        </ul>
                        <div style={{display: targetOpen===index ? "inline-block": "none"}} className="test-text">{setExtraContent(item)} </div>
                    </div>
                ))}
        </div>
    );
};

export default ItemList;
