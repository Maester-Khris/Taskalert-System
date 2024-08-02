const {Router} = require('express');
const router = Router();
const Pusher  = require('pusher');
const PusherClient = require('pusher-js');


const pusher = new Pusher({
  appId: process.env.PUSHER_CHANNEL_APP_ID,
  key: process.env.PUSHER_CHANNEL_KEY,
  secret: process.env.PUSHER_CHANNEL_SECRET,
  cluster: process.env.PUSHER_CHANNEL_CLUSTER,
  useTLS: true,
});
const pusherClient = new PusherClient( process.env.PUSHER_CHANNEL_KEY, {
  cluster: process.env.PUSHER_CHANNEL_CLUSTER,
});

// Task - Notif channel
// const channel = pusherClient.subscribe('task-reminder');
// channel.bind('new-reminder', function (data) {
//   console.log(data.message);
// });
// router.get("/talkback",(req,res)=>{
//   // this code should be included in client channel bind(reminder-read)
//   pusher.trigger("task-reminder", "update-status", {
//     message: "The preceeding reminder was seen!"
//   }).then(()=>{
//     res.status(200).json({message:"new message sent"})
//   });
// });


// Notif - Client channel
const clientChannel = pusherClient.subscribe('reminder-ontime');
clientChannel.bind('reminder-read', function (data) {
  console.log("answer from the client: "+data.message);
});

router.get("/communicate",(req,res)=>{
  console.log("communicate with client");
  pusher.trigger("reminder-ontime", "reminder-arrived", {
    message: "The time of this task has arrived!"
  }).then(()=>{
    res.status(200).json({message:"new message sent"})
  });
});


router.post('/pusher/auth', (req, res) => {
  console.log('POST to /pusher/auth');
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});


// pusher.trigger("task-notif", "new-event", {
//   message: "This a new reminder"
// });

module.exports = router;