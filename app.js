const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const loginRoutes = require('./routes/login');

app.set('views','views');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use('/login', loginRoutes)

app.get('/', (req, res) => {
    res.render("index.ejs")

});

app.listen(3000);
