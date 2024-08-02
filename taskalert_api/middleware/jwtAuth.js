const jwt = require("jsonwebtoken");

exports.jwtauth = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[2];
    
    if(token == null) return res.status(401).json({message: "Unauthorized, token doesn't exist"});
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, result)=>{
        if(err){
            console.log(err);
            return res.status(403).json({message: "Verification failed, access forbidden"});
        }else if(res){
            console.log(req.body);
            next();
        }
    });
};