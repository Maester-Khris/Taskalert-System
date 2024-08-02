const express = require('express');
const mongoconnection = require('./database/connection');
const authRoutes = require('./routes');


const PORT = process.env.PORT | 8003;
const app = express();

// setup db connection
mongoconnection.OpenConnection(process.env.DB_CONNECTION_STRING).then(()=>{
    console.log("connection to mongo well established");
});
// setup for json data|form data|routing
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);

app.listen(PORT, ()=>{
    console.log(`Auth service live and listening on port ${PORT}`);
});

// created user credential to test with plain html/js, token create at 18:21
// {
//     email: "mojalez@gmail.com"
//     access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibW9qYWxlekBnbWFpbC5jb20iLCJpYXQiOjE3MTE4MTgwODEsImV4cCI6MTcxMTgyMTY4MX0.dRdX5cPXHgkaC4x6pBPzVDf-r7uoRuKYcbZJogLR-V0"
// }