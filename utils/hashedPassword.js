const bcrypt = require("bcrypt")

const saltRounds = 10;

const hashedPassword = (password) =>{
    return new Promise((resovle)=>{
        resovle(bcrypt.hashSync(password,saltRounds))
    })
}

const comparePassword = (password,hashedPassword)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,hashedPassword, function(err,result){
            if(err){
                reject(err)
            }
            resolve(result)
        })
    })
}
module.exports = {
    hashedPassword,
    comparePassword
}