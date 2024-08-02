//========================== OLD CONNECTION PRODUCTION ===============================
const mongoClient = mongodb.MongoClient;
const connectionUrl = "mongodb+srv://nk_dev:JlreVIdITFqTbNmK@cluster0.sgdzstx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoClient.connect(connectionUrl, (error, client)=>{
    if(error)
        return 'something went went wronf during connection';
    else    
        console.log(client);
});
