const express = require('express');
const {addProduction} = require("../../model/production/productionModel");

const router = express.Router();

router.post("/addallproducts", (req,res)=>{
    const data = req.body;

    const result = data.map((d)=> addProduction(d))
    if(result){
        console.log(4000,result)
        res.json({status:"success",message:"data added successfuly"})
    }
    res.json({status:"error",message:"error in adding data"})
})

module.exports = router