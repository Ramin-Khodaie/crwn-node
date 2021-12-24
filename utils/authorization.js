const {verifyAccessToken} = require('./JWTTokens');
const {getJWT} = require('./redis');

 const userAuthorization = async (req,res,next) =>{
   const {authorization} = req.headers;
   
   const decode = await verifyAccessToken(authorization)
   if(decode.email){
     const userId = await getJWT(authorization)
     
     console.log(3388,userId)
        if(!userId){
          return res.status(403).json({message:"Forbidden"});
        }
        req.userId = userId;
        return next()
    }
}

module.exports = {
  userAuthorization
}