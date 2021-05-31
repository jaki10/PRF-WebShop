const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    id: {type: Number, unique: true, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
}, {collection: 'products'});

mongoose.model('product', productSchema);