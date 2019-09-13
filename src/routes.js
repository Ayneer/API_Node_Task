const express = require('express');
const routes = express.Router();
const Task = require('./models/Task');
const User = require('./models/User');

routes.get('/app', (req, res) => {

});

routes.get("/task", async (req, res) => {

    const lisTask = await Task.find({});

    if (lisTask) {
        res.status(200).send({ lisTask: lisTask, state: true, error: false });
    } else {
        res.status(400).send({ message: "There is not any task.", state: false, error: false, lisTask: {} });
    }

});

routes.put("/task/:_id", (req, res) => {

    Task.findByIdAndUpdate({ _id: req.params._id }, req.body, (error, doc) => {
        if (error) {
            res.status(500).send({ message: "Error to try updating the task.", state: false, error: true });
        } else {
            if (doc) {
                res.status(200).send({ message: "Task updated!", state: true, error: false });
            } else {
                res.status(400).send({ message: "There is not any task with that id.", state: false, error: false });
            }
        }
    })
});

routes.post("/task", (req, res) => {
    body = req.body;

    const task = new Task();

    task.title = body.title;
    task.description = body.description;
    task.user = body.user;
    task.status = body.status;

    task.save((err, doc) => {
        if (err) {
            res.status(500).send({ message: "Error to try saving the task.", state: false });
        } else {
            res.status(200).send({ message: "Task saved!", state: true });
        }
    });
});

routes.get("/user", async (req, res) => {

    const listUser = await User.find({});

    if (listUser) {
        res.status(200).send({ user: listUser, state: true, error: false });
    } else {
        res.status(400).send({ message: "There is not any task.", state: false, error: false, user: {} });
    }

});

routes.post("/user", async (req, res) => {

    body = req.body;

    const user = await User.findOne({ email: body.email });
    console.log(user);
    if (!user) {
        const newUser = new User();
        newUser.name = body.name;
        newUser.email = body.email;
        newUser.save((err) => {
            if (err) {
                res.status(500).send({ message: "Error to try saving the task.", state: false });
            } else {
                res.status(200).send({ message: "User saved successfully", state: true, error: true });
            }
        });
    } else {
        res.status(200).send({ message: "The user already exist!", state: false, error: false });
    }

});

routes.put("/user/:_id", (req, res) => {

    User.findByIdAndUpdate({ _id: req.params._id }, req.body, (error, doc) => {
        if (error) {
            res.status(500).send({ message: "Error to try updating the User.", state: false, error: true });
        } else {
            if (doc) {
                res.status(200).send({ message: "User updated successfully", state: true, error: false });
            } else {
                res.status(400).send({ message: "There is not any user with that id.", state: false, error: false });
            }
        }
    })
});

routes.delete("/user/:_id", async (req, res) => {

    const user = await User.findOne({ _id: req.params._id });
    if (user) {
        const task = await Task.findOne({ user: user.email });
        if (!task) {
            User.findByIdAndDelete({ _id: req.params._id }, (error, doc) => {
                if (error) {
                    res.status(500).send({ message: "Error to try deleting the User.", state: false, error: true });
                } else {
                    res.status(200).send({ message: "User deleted successfully", state: true, error: false });
                }
            })
        }else{
            console.log(task);
            res.status(400).send({ message: "There is a task with this user, delete it or remove the task's user", state: false, error: false });
        }
    }else{
        res.status(400).send({ message: "There is not any user with that id.", state: false, error: false });
    }


});

module.exports = routes;