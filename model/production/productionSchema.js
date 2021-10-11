const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productionSchema = new Schema({
    id:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    routeName:{
        type:String,
        required:true
    },
    items:[{
        id:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true,
            maxlength:50            
        },
        imageUrl:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:Number
        }
    }],
    size:{
        type:String,
        required:false,        
    }
})

module.exports = {
    productionSchema : mongoose.model("production",productionSchema)
}