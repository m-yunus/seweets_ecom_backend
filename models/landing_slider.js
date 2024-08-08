const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Slider', sliderSchema);;
