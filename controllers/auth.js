const express = require('express');
const userModel = require('../models/user');
const bcrypt = require('bcrypt')
const passport = require('passport');
const initPassport = require('../passport-config');

// initPassport(password, email => {
//     return users.find(user => user.email === email)
// })

const app = express();
app.use(express.urlencoded({extended: false}));  //find out more detail about this 

//End point resulting in login page to render
exports.getLogin = (req, res, next) => {
res.render('loginPage');
};

exports.postLogin = (req,res,next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
}

exports.postLogout = (req,res,next) => {
    req.session.destroy( (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/');
    }); 
};

exports.getRegister = (req,res,next) => {
    res.render('registerPage');
};

exports.postRegister = (req,res,next) => {
    const userInput = req.body.user;
    const emailInput = req.body.email;
    const passwordInput = req.body.password;
    userModel.findOne({ email: emailInput}).then( user =>
    {
        if(!user){
            const newUser = new userModel({
                name : userInput,
                email : emailInput
            });
            newUser.save();
            res.redirect('/auth/login');
        }
        else
        {
            //need to find a way to handle if email already exists
            //error message
            res.redirect('/auth/register');
        }
    })
    .catch( err => {
        console.log(err);
    });
    

};
//End point handles login requests 
// exports.postLogin = async (req,res) => {
//     try{
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         users.push({
//             id: Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//         });
//         res.redirect('/login');
//     }
//     catch{
//         res.redirect('/') //need to redirect it to login page (CR)
//     }
//     console.log(users)
// };