const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


// const tokenSecret = crypto.randomBytes(64).toString('hex');
// console.log(tokenSecret);
// console.log(process.env.TOKEN_SECRET);

function generateAccessToken(data_to_hash){
    return jwt.sign(data_to_hash,process.env.TOKEN_SECRET,{expiresIn: '300s'});
}

module.exports = {generateAccessToken};