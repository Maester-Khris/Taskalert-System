const express = require('express');
const path = require('path');
require('dotenv').config();

const pushRoutes = require('./services/messaging');
const PORT = process.env.PORT | 8002;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'scripts')));
app.use(pushRoutes);


// =========== push notification =========================
// const vapidkKeys = {
//     publicKey: process.env.PUBLIC_VAPID_KEY,
//     privateKey: process.env.PRIVATE_VAPID_KEY
// }
// webPush.setVapidDetails('ndevjoel@gmail.com', vapidkKeys.publicKey, vapidkKeys.privateKey);
// app.post('/notify',(req,res)=>{
//     let subscription = req.body
//     res.status(201).json({});
    
//     const payload = JSON.stringify({
//         title: 'Push notifications with Service Workers',
//     });
    
//     webPush.sendNotification(subscription, payload)
//     .catch(error => console.error(error));
// });



// Serve and route
app.get('/test', (req, res)=>{
    res.sendFile(path.join(__dirname, 'scripts', 'service-worker.js'));
});

app.listen(PORT, ()=>{
    console.log(`Notification service live and listening on port ${PORT}`);
});