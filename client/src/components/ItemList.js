import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemForm from "./ItemForm";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [editItem, setEditItem] = useState(null);

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

    const startEditing = (item) => {
        setEditItem(item);
    };

    return (
        <div>
            <ItemForm
                currentItem={editItem}
                setEditItem={setEditItem}
                refreshItems={setItems}
            />

            <h3>Item List</h3>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => startEditing(item)}>Edit</button>
                                <button onClick={() => deleteItem(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
