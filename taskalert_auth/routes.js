const { Router } = require('express'); 
const utils = require('./services/utils')
const database = require('./database/accesmethod');
const app = Router();


// ========= Test related methods =============
app.get('/', async (req, res)=>{
   console.log("trying huh ...");
   res.status(200).json({message: "Welcome on auth service ..."});
});
app.get('/users', (req, res)=>{
    let val = "this is the list of users";
    res.status(200).json({message: val})
}); 
app.get('/users/projects', (req, res)=>{
    let val = "this is the list of users projects ";
    res.status(200).json({message: val})
}); 

// ========= Auth Api related methods: Non protected route =============
app.post('/api/token-isblacklisted',async(req, res)=>{
    token_to_verify = req.body.token;
    let blacklist = await database.checkItemOnBlacklist(token_to_verify);
    let flag = blacklist == null ? false : true;
    res.status(200).json({isTokenBlacklisted: flag});
});

// ========= Auth related methods =============
app.post('/signup', async(req, res)=>{
    let userdata = req.body;
    userdata.password = await utils.generateHashedpass(userdata.password);
    await database.newUser(userdata);
    res.status(200).json({message: "new user added"})
});
app.post('/signin',async(req, res)=>{
    let userdata = req.body;
    let userres = await database.getUserByEmail(userdata.email);
    if(userres.length == 0) res.status(404).json({message: "user not found"});

    let passFlag = await utils.verifyHashedpass(userdata.password, userres[0].password);
    if(passFlag){
        let newaccesstoken = await utils.generateUserAccessToken(userres[0].email);
        res.status(200).json({message: "login succeeded", access_token:newaccesstoken});
    }else{
        res.status(404).json({message: "Bad input, user not found"});
    }
});
app.get('/signout',async(req, res)=>{
    const authHeader = req.headers['authorization'];
    const token_to_invalidate = authHeader && authHeader.split(' ')[1];
    await database.addItemOnBlacklist(token_to_invalidate);
    res.status(200).json({ message: 'You are logged out!' });
});

module.exports = app;