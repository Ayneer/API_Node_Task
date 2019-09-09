const express = require('express');
const routes = express.Router();
const Task = require('./models/Task');

routes.get('/app', (req, res)=>{

});

routes.get("/task", async (req, res)=>{
    
    const lisTask = await Task.find({});

    if(lisTask){
        res.status(200).send({lisTask: lisTask, state: true, error: false});
    }else{
        res.status(400).send({message:"There is not any task.", state: false, error: false, lisTask: {}});
    }

});

routes.put("/task/:_id", (req, res)=>{

    Task.findByIdAndUpdate({_id: req.params._id}, req.body, (error, doc)=>{
        if(error){
            res.status(500).send({message:"Error to try updating the task.", state: false, error: true});
        }else{
            if(doc){
                res.status(200).send({message:"Task updated!", state: true, error: false});
            }else{
                res.status(400).send({message:"There is not any task with that id.", state: false, error: false});
            }
        }
    })
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