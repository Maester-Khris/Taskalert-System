const {Router} = require('express');
const router = Router();
const Pusher  = require('pusher');
const PusherClient = require('pusher-js');

console.log(process.env.PUSHER_CHANNEL_KEY);

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

const channel = pusherClient.subscribe('task-notif');
channel.bind('message-status', function (data) {
  console.log(data.message);
});


router.get('/newMessage',(req, res)=>{
  pusher.trigger("task-notif", "new-message", {
    message: "This a new reminder"
  }).then(()=>{
    res.status(200).json({message:"new message sent"})
  });
})

// router.post('/pusher/auth', (req, res) => {
//   console.log('POST to /pusher/auth');
//   const socketId = req.body.socket_id;
//   const channel = req.body.channel_name;
//   const auth = pusher.authenticate(socketId, channel);
//   res.send(auth);
// });




module.exports = router;