const mongoose = require('mongoose');
const {Task} = require('../models/Task');

async function newTask(task_object){
    const task = new Task({
        title: task_object.title,
        body: {
            templateType: task_object.template,
            textContent: task_object.text,
            itemContent:  task_object.items
        },
        status: task_object.status,
    }); 
    await task.save();
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

async function getTaskById(id){
    let task = await Task.findById(id);
    return task;
}

async function searchWithFulltextOption(searchString){
    let task = await Task.find({ $text : { $search : searchString }});
    return task;
}

async function searchTaskByTitle(query){
    let pattern =  RegExp(query,'i');
    let task = await Task.find({title: {$regex: pattern}}).where('status');
    return task;
} 

async function searchTaskByTitleWithStatus(query, status){
    let title_pattern = RegExp(query,'i');
    let status_pattern = RegExp(status,'i');
    let task = await Task.find({title: {$regex: title_pattern}, status:{$regex:status_pattern}});
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

module.exports = {
    newTask,
    browseTasks,
    getTaskByUuid,
    getTaskById,
    editStatus,
    updateTask,
    removeTask,
    searchTaskByTitle,
    searchTaskByTitleWithStatus,
    searchWithFulltextOption
}