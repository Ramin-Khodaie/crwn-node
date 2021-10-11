const {productionSchema} = require("./productionSchema");

const addProduction = product =>{
    return new Promise((resolve,reject)=>{
        productionSchema(product)
        .save()
        .then(data=>resolve(data))
        .catch(error=>reject(error))
    })
}


module.exports = {
    addProduction
}