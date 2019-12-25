// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt')

// function init(passport){
//     const authenticateUser = (email,password, done)=> {
//         const user = getUserByEmail(email);
//         if(user ==null){
//             return done(null,false, {message: 'User email not found'})
//         }
//         try{
//             if(await bcrypt.compare(password,user.password)){
//                 return done(null,user);

//             } else {
//                 return done(null,false, {message: 'Password Incorrect'})
//             }
//         }
//         catch(e){
//             return done(e);

//         }

//     }
// passpord.use(new LocalStrategy({usernameField: 'email'}), authenticateUser);
// passport.serializeUser((user, done) => {});
// passport.deserializeUser((id,done) => {});
// }
// module.exports = init;