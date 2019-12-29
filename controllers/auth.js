const express = require('express');
const userModel = require('../models/user');
const bcrypt = require('bcrypt')


const app = express();
app.use(express.urlencoded({extended: false}));  //find out more detail about this 


///login functionality
exports.getLogin = (req, res, next) => {
    if(req.session.isLoggedIn == true){
        return res.redirect('/');
    }
    return res.render('loginPage');
};
exports.postLogin = (req,res,next) => {
    const emailInput = req.body.email;
    const passwordInput = req.body.password;
    userModel.findOne({email: emailInput})
    .then( emailfound => {
        if(!emailfound){
            return res.redirect('/auth/login'); //need to handle email not found message 
        }
        bcrypt.compare(passwordInput,emailfound.password)
        .then(same =>{
            if(same){
                var userName;
                var userEmail;
                req.session.isLoggedIn = true;
                userModel.findOne({email : emailInput})
                .then(userfound => {
                    userName = userfound.name;
                    userEmail = userfound.email;
                })
                .then( rest => {
                    req.session.email = userEmail;
                    req.session.name= userName;
                    return res.redirect('/')
                })
                .catch( err => {
                    console.log(err);
                    return res.redirect('/auth/login')
                });
            }
            else{
            return res.redirect('/auth/login')
            }
        })
        .catch( err => {
            console.log(err);
            res.redirect('/auth/login'); //need to hangle wrong password message
        });
    } )
    .catch(err =>{
        console.log(err);
    });
}



///log out functionaility
exports.postLogout = (req,res,next) => {
    req.session.destroy( (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/');
    }); 
};



///sign up functionalilty 
exports.getRegister = (req,res,next) => {
    res.render('registerPage');
};

exports.postRegister = (req,res,next) => {
    const userInputRaw = req.body.user;
    const userInput = userInputRaw.charAt(0).toUpperCase() + userInputRaw.substring(1);
    const emailInput = req.body.email;
    const passwordInput = req.body.password;
    userModel.findOne({ email: emailInput}).then( user =>{
        if(!user){
            return bcrypt.hash(passwordInput,14) //salt value of min 12 is recommended
            .then(securePassword => {
                const newUser = new userModel({
                    name : userInput,
                    email : emailInput,
                    password: securePassword
                });
                 newUser.save();
                res.redirect('/auth/login');
            })
        }
        else{
            //need to find a way to handle if email already exists
            //error message
            return res.redirect('/auth/register');
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