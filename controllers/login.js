var express=require('express');
var router=express.Router();
loginModel=require.main.require('./models/login_model');
router.get('/',function(req,res){
    res.render('login');
});

router.post('/', function(req,res){
    // console.log("got into controller");
    var data={
        
        email:req.body.email,
        password:req.body.password,
       
    };
    loginModel.loginData(data, function(result){
        if(result)
        {
            req.session.loggedUser=data.email;

            res.redirect('/home');

        }else{
            res.redirect('/login');
            console.log("Error no user information.")
        }
    });

});


// router.post('/',function(req,res){
//     var data={
        
//         email:req.body.email,
//         password:req.body.password,
       
//     };
//     loginModel.loginData(data, function(result){
//         if(result)
//         {
//             res.redirect('/home');

//         }else{
//             res.redirect('/login');
//             console.log("Error no user information.")
//         }
//     });

// });

module.exports=router;