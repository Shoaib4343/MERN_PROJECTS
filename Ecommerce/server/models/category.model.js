const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    slug:{
        type:String,
        lowercase:true
    }

})

module.exports = mongoose.model("Category",categoryModel)