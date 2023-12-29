const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");


const ProductSchema = new mongoose.Schema({
    Productname: {
        type: String,
        trim: true,
        default: null,
        unique:true,
    },
    Quantity: {
        type: Number,
        trim: true,
        default: 0,
    },
    Price: {
        type: Number,
        trim: true,
        default: 0,
    }
});


ProductSchema.plugin(mongoose_delete);

// Middleware
// Error handling
ProductSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(error);
    } else {
        next();
    }
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
