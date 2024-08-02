const mongoose = require('mongoose');

async function OpenConnection(connectionString){
    await mongoose.connect(connectionString);
}

module.exports = {OpenConnection};