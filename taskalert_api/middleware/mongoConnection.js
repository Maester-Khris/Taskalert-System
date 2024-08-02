const mongoose = require('mongoose');

const checkMongoReady = (req, res, next) => {
    if(mongoose.connection.readyState !== 1) {
        console.log('Waiting for MongoDB connection...');
        mongoose.connection.once('connected', next);
    }else {
        next();
    }
};

module.exports = {checkMongoReady};