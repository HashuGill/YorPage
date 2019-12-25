const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userModel = require('./models/user');
const app = express();
app.set('views','views');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

//init session and session storage
const session = require('express-session');
const mongoose = require('mongoose');
const mongodbStore = require('connect-mongodb-session')(session);

const MONGO_URI = 'mongodb+srv://YorPage:hhAIvzxVuV6oDnpf@cluster0-nnom9.mongodb.net/YorPage?retryWrites=true&w=majority';
const sessionStore = new mongodbStore({
    uri: MONGO_URI,
    collection: 'sessions'
})

app.use(
    session({secret: 'some long string', store: sessionStore, resave: false, saveUninitialized: false})
    );


app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render("index.ejs");
});

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true }) //, useUnifiedTopology: true
.then(result => {
    app.listen(3000)
})
.catch(err =>{
    console.log(err);
});
