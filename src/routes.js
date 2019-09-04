const express = require('express');
const routes = express.Router();
const Task = require('./models/Task');

routes.get('/app', (req, res)=>{

});

routes.get("/task", async (req, res)=>{
    
    const lisTasks = await Task.find({});

    if(lisTasks){
        res.status(200).send(lisTasks);
    }else{
        res.status(400).send({message:"There is not any task.", state: false});
    }

});

routes.post("/task", (req, res)=>{
    body = req.body;
    task = new Task();
    task.title = body.title;
    task.description = body.description;
    task.user = body.user;
    task.status = body.status;
    task.save((err, doc)=>{
        if(err){
            res.status(500).send({message:"Error to try saving the task.", state: false});
        }else{
            res.status(200).send({message:"Task saved!", state: true});
        }
    });
});


module.exports = routes;