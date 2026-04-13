import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
   //take token from user using headers
   const {token} = req.headers;

    //check if token is present
    if(!token){
        return res.status(401).json({success:false, message: 'Not Authorized Login'});
    }
    try{
        //if we have a token, we decode it using jwt and secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!req.body) {
         req.body = {};
      }
        req.body.userId = token_decode.id;
        //after decoding the token, we pass the control
        next();
    }
    catch(error){
     console.log(error);
     return res.status(401).json({success:false, message:'Error'});
    }
}

export default authMiddleware;