import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemForm = ({ currentItem, setEditItem, refreshItems }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (currentItem) {
            setName(currentItem.name);
            setDescription(currentItem.description);
        }
    }, [currentItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentItem) {
            // Update item functionality
            const res = await axios.put(`http://localhost:5000/items/${currentItem._id}`, { name, description });
            refreshItems((prevItems) =>
                prevItems.map((item) => (item._id === currentItem._id ? res.data : item))
            );
            setEditItem(null); // Close the edit form
        } else {
            // Add item functionality
            const res = await axios.post("http://localhost:5000/items", { name, description });
            refreshItems((prevItems) => [...prevItems, res.data]); // Update the table dynamically
        }

        setName("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">{currentItem ? "Update" : "Add"} Item</button>
            {currentItem && <button onClick={() => setEditItem(null)}>Cancel</button>}
        </form>
    );
};

export default ItemForm;
