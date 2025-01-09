const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/mycrudapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Define Schema
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Item = mongoose.model("Item", ItemSchema);

// CRUD API Routes
app.post("/items", async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
});

app.get("/items", async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

app.put("/items/:id", async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(item);
});

app.delete("/items/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.send({ message: "Item deleted" });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
