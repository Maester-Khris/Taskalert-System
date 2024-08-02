const mongoose = require('mongoose');
const User = require('../models/User');
const Blacklist = require('../models/Blacklist');

async function newUser(user_object){
    const user = await User.create({
        fullname: user_object.fullname,
        password: user_object.password,
        email: user_object.email
    }); 
    return user;
}

async function getUserByEmail(email){
    let user =  await User.where('email').equals(email);
    return user;
}

async function addItemOnBlacklist(old_token){
    const blacklist = await Blacklist.create({
        token: old_token,
    }); 
    return blacklist;
}

async function checkItemOnBlacklist(token_to_check){
    const blacklisted = await Blacklist.exists({token:token_to_check});
    return blacklisted;
}


module.exports = {newUser, getUserByEmail, addItemOnBlacklist, checkItemOnBlacklist}