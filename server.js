require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// better style of connecting database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,  
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to the database!!!');
}).catch(error => {
    console.log('db connection error ${error.message}');
    process.exit(-1);
});

//This is the home page url!!
app.get('/', (req, res) => {
    res.send('In Home Page!!!');
});

app.use(express.json());

const subscriberRouter = require('./routes/subscribers');
app.use('/subscribers', subscriberRouter);

app.listen(3000, () => console.log('server has started!!!'));

// this works too for db connection establishment
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true});
// const db = mongoose.connection;
// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log('connected to database!!'));