const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/taskApp')
.then(console.log('Connecting to Mongodb...'))
.catch(err => console.log("Error to try connecting to Mongodb."));