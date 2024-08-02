const mongodb = require('mongodb');
const mongoose = require('mongoose');
const localConnection = "mongodb://127.0.0.1:27017/Taskalert";

const User = require('../models/User');
const Task = require('../models/Task');
// ====================================================================================================
// 26.03 : localhost training


async function OpenConnection(connectionString){
    await mongoose.connect(connectionString);
}

async function newTask(task_object){
    const task = await Task.create({
        title: task_object.title,
        body: {
            templateType: task_object.template,
            textContent: task_object.text,
            itemContent: task_object.items
        },
        status: task_object.status,
    }); 
    return task;
}

async function browseTasks(){
    let tasks = await Task.find();
    return tasks;
}

async function getTaskByUuid(task_uuid){
    let task =  await Task.where('uuid').equals(task_uuid);
    return task;
}

async function editStatus(task_uuid, newstatus){
    let updatedrows=  await Task.updateOne({uuid: task_uuid},{status: newstatus, updatedAt: new Date()});
    return updatedrows;
}

async function updateTask(task_uuid, new_task_object){
    let task =  await Task.findOne({uuid: task_uuid});
    task.title = new_task_object.title;
    task.body = {
        templateType: new_task_object.template,
        textContent: new_task_object.text,
        itemContent: new_task_object.items
    };
    task.updatedAt = new Date();
    task.save();
    return task;
}

async function removeTask(task_uuid){
    let deletedrows =  await Task.deleteOne({uuid: task_uuid});
    return deletedrows;
}

// ===============================================
// CRUD: Test Bed
let myTaskData = {
    title: "35 Days to unf**** your life",
    template: "v_items",
    text: "",
    items: [
        {content: "angular material fab button", checked: true},
        {content: "api gateway with proxy", checked: true},
        {content: "task service crud", checked: false},
        {content: "one week no soda juice", checked: false},
        {content: "one week 2 dry fast", checked: false},
    ]
}

OpenConnection(localConnection).then(async ()=>{
    console.log("================ Test Bed experiments: content edit ================")
    // 1- Browse
    // let tasks = await browseTasks();
    // console.log(tasks);

    // 2- Read
    // let task = await getTaskByUuid("a4e75180-eb9d-11ee-823b-c5015596655a");
    // console.log(task);

    // 3- Add
    // await newTask(myTaskData);

    // 4- update
    // 4.1: satus
    // let res = await editStatus("ecf380e0-eba0-11ee-a176-93fdcaab723f","RECYCLED");
    // 4.2: content
    // res = await updateTask("ecf380e0-eba0-11ee-a176-93fdcaab723f",myTaskData);
    // console.log(res);

    // 5- delete
    // let res = await removeTask("a4e75180-eb9d-11ee-823b-c5015596655a");
    // console.log(res);
});






// (async () =>{
//     await mongoose.connect(localConnection);
//     try{
       
//     }catch(e){
//         console.log(e.message);
//     }
// })();

// ==================================================
// ====== 25.03 - Training code session

// let user = await User.where("name")
//     .equals("Djikstra")
// .select("age")
// .populate("bestfriend")
// .limit(2);

// let user = await User.findOne({name:"Apoutchou"});

// let users = await User.findByEfficiency();
// console.log(users);
// users.forEach(user => {
//     console.log(user.getInfo());
// });    

// let user = await User.insensitiveSearch("apoutchou");
// console.log(user);

// let user = await User.find({name:"Apoutchou"});
// let user = await User.findById("6601def468ca125fdea8aea2");
// let user1 = await User.create({
//     name: "Parolier", 
//     age:28,
// updated_at: new Date(),
// skills: ["Francais", "Theaodor"],
// projects: {title:"Trendy", description:"Too good to be true" },
// collaborator: user._id,
// });
// user1.save();
// console.log(user);