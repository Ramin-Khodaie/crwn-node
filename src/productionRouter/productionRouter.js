const express = require("express");
const {
  addProduction,
  getAllProducts,
  getCategory,
  getShopItems,
} = require("../../model/production/productionModel");

const router = express.Router();

router.post("/addallproducts", (req, res) => {
  const data = req.body;
  console.log(req.body);
  const result = data.map((d) => addProduction(d));
  if (result) {
    console.log(777, result);
    res.json({ status: "success", message: "data added successfuly" });
  }
  res.json({ status: "error", message: "error in adding data" });
});

//api for getting all products from db
router.get("/", async (req, res) => {
  try {
    const data = await getAllProducts();

    if (data) {
      
      res.json({
        status: "success",
        message: "data retrieve successfully",
        data,
      });
    }
  } catch (error) {
    res.json({ status: "error", message: "error in data fecthing" });
  }
});
router.get('/shopitem',async (req,res)=>{
  const data = await getShopItems()
    if(data){
    res.json({status:"success",data})
  }
})
router.get("/:_id",async(req,res)=>{
    const {_id} = req.params
    console.log(666,_id)
    try {
        const data = await getCategory(_id);
        
        res.json({status:"success",message:"ok",data})
    } catch (error) {
        
    }
})
module.exports = router;
