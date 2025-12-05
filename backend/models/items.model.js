import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },

},
    {
    // when was producted created or updated
    timestamps: true
    }
);

// will create a collection called items 
const Item = mongoose.model('Item', itemsSchema);

export default Item;

