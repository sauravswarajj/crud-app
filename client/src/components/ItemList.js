import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get("http://localhost:5000/items");
            setItems(res.data);
        };
        fetchItems();
    }, []);

    const deleteItem = async (id) => {
        await axios.delete(`http://localhost:5000/items/${id}`);
        setItems(items.filter((item) => item._id !== id));
    };

    return (
        <ul>
            {items.map((item) => (
                <li key={item._id}>
                    <strong>{item.name}</strong>: {item.description}
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default ItemList;
