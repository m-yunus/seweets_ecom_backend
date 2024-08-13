const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Trims whitespace from both ends
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
       
    },
    isFeatured: {
        type: Boolean,
        default: false, // Indicates whether the category is featured
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to a parent category, useful for subcategories
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the date when the category is created
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically updates the date when the category is updated
    }
});


module.exports = mongoose.model('Category', CategorySchema);
