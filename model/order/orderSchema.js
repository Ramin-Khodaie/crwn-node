const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = new Schema({
  
    cartitems:[
        {
            id:{
                type:Number,
                required:true
            },
            name:{
                type:String,
                required:true
            },
            imageurl:{
                type:String,
                required:true
            },
            price:{
                type:String,
                required:true
            },
            data_id:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ]
    ,
    orderprice:{
        type:Number,
        required:true
    },
    userinfo:{
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            maxlength:11,
            required:true
        },
        zipcode:{
            type:Number,
            maxlength:5,
            required:true
        },
        province:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        street:{
            type:String,
            required:true
        }
    },
    orderdate:{
        type:Date,
        default:Date.now()
    }
})

module.exports={
    orderSchema : mongoose.model("order",orderSchema)
}