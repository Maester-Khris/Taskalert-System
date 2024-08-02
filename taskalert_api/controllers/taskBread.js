const database = require('../database/accesmethod');

const List = (async (req,res) => {
    res.status(200).json({message: await database.browseTasks()});
});
const Create = (async (req,res) => {
    res.status(201).json({
        message: await database.newTask({
                title: req.body.title, items: req.body.items, template:req.body.template, text: req.body.text
            })
        }
    );
});
const GetOne = (async (req,res) => {
    const { id } = req.params;
    res.status(200).json({message: await database.getTaskById(id)});
});


module.exports = {List, Create, GetOne};