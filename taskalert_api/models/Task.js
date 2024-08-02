const mongoose = require("mongoose");
const uuid = require('uuid');

const ItemSchema = new mongoose.Schema({
    content: String,
    checked: { 
        type: Boolean, 
        default:false
    }
});

const TaskSchema = new mongoose.Schema({
    title: String,
    body: {
        templateType: String,
        textContent: String,
        itemContent:[ItemSchema]
    },
    status:{
        type: String,
        default: "VISIBLE"
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    uuid: {
        type: String,
        default: uuid.v1()
    }
});

TaskSchema.pre('validate', async function(next){
    const task = this;
    console.log("pre method working");
    let items = task.body.itemContent;
    let validatedItem = items.map(async (item) =>{
        console.log(typeof(item));
        if(typeof(item)== "string"){
            const itemExist = await Item.findOne({content: item});
            if(!itemExist){
                const ite = new Item({content: item});
                await ite.save();
                return ite;
            }else{
                return itemExist;
            }            
        }else{
            return item;
        }
    });
    task.body.itemContent = validatedItem;
    next();
});


const Item = mongoose.model('Item', ItemSchema);
const Task = mongoose.model('Task', TaskSchema);
module.exports ={Task, Item};