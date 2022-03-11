const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        images: {type: String, required: true},
        categories: {type: Array},
        price: {type: Number, required: true}
    },
    { timestamps: true }
)

module.exports = mongoose.model("Products", ProductSchema)