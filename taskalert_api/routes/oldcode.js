


// configure express for remote connection and json data
const cors = require('cors');
var corsOption = {origin: "http://localhost:8002"};
app.use(cors(corsOption));
app.use(express.json()); //get json content
app.use(express.urlencoded({extended: true})); //get form content

app.get("/",(req,res)=>{
    res.json({message:"RESTFULL API WORKING FINE"});
});