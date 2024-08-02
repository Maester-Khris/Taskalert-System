const crypto = require('crypto');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const saltRounds = 10
dotenv.config();


// ============ Token related methods ============
function generateSecretToken(){
    return crypto.randomBytes(64).toString('hex');
} 
function generateUserAccessToken(user_data){
    return jwt.sign({user: user_data},process.env.JWT_TOKEN_SECRET,{expiresIn: '1h'});
} 
function invalidateUserAccessToken(){
    // code to insert after
} 



// ============ User related methods ============
async function generateHashedpass(password){
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedpass = await bcrypt.hash(password, salt)
    return hashedpass;
} 
async function verifyHashedpass(plainPass, hashedPass){
    let flag = await bcrypt.compare(plainPass, hashedPass) 
    return flag;
}


module.exports = {
    generateSecretToken, generateUserAccessToken, invalidateUserAccessToken, 
    generateHashedpass, verifyHashedpass
}