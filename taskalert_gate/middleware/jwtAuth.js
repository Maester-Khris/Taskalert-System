const jwt = require("jsonwebtoken");
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

exports.jwtauth = async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // verify if token has been sent
    if(token == null) return res.status(401).json({message: "Unauthorized, token doesn't exist"});

    // verify if the token has not be invalidated (blacklisted)
    let http_res = await axios.post('http://localhost:8000/auth/api/token-isblacklisted',{token:token});
    if(http_res.data.isTokenBlacklisted == true) return res.status(401).json({message: "Session expired, login or refresh"})

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, result)=>{
        if(err){
            console.log('Jwt verification error: '+err.message);
            return res.status(403).json({message: `Access forbidden ${err.message}`});
        }else if(res){
            console.log(req.body);
            next();
        }
    });
};