const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('views','views');
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.get('/login',(req,res,next) => {
    res.render("loginPage.ejs");

});

app.get('/', (req, res) => {
    res.render("index.ejs")

});

const min = 50;

app.listen(3000);
