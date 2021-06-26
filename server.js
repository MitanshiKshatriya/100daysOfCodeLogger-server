const express = require('express')
const mongoose = require('mongoose')
const app = express();

// express middleware
app.use(express.json());
app.use(express.urlencoded());

// requiring routes
const logs = require('./routes/api/logs');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const goals = require('./routes/api/goals');


//DB config
const db = require('./config/keys').mongoURI

// connect to Mongo
mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true
})
    .then(()=>console.log('MongoDB connected...'))
    .catch(err=>console.log(err));

//Use Routes
app.use('/api/logs',logs);
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/goals',goals);


// listening on port
const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server started on port ${port} `))

