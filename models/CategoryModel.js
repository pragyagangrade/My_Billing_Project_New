const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");


const CategorySchema = new mongoose.Schema({
    Categoryname: {
        type: String,
        trim: true,
        default: null,
        unique:true,
    },
    CategoryID: {
        type: Number,
        trim: true,
        default: 0,
    }
});


CategorySchema.plugin(mongoose_delete);

// Middleware
// Error handling
CategorySchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(error);
    } else {
        next();
    }
});

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
