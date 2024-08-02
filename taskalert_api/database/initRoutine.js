const mongodb = require("mongodb");
const client = new mongodb.MongoClient(process.env.DB_CONNECTION_STRING,   {
    serverApi: {
        version: mongodb.ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

async function InitTaskalertDB(){
    try{
        await client.connect();
        console.log("===================================================");
        console.log("Starting DB initialisation");
        
        let pingres = await client.db("Taskalert").command({ ping: 1 });
        console.log("db connection result: "+ pingres);
        console.log("1- Connection success");

        let tasksCollection = await client.db("Taskalert").createCollection("tasks");
        console.log("2- Create Collection success");

        let op2_res = await tasksCollection.createIndex({"title":"text","body.textContent":"text","body.itemContent":"text"});
        console.log(op2_res);
        console.log("3- Create Collection Fulltext search index success");

        console.log("===================================================");
        console.log("DB initialisation finished with succes");
    }finally{
        await client.close();
    }    
}

InitTaskalertDB();
