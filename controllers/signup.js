var express=require('express');
var router=express.Router();

signupModel=require.main.require('./models/signup_model');

router.get('/',function(req,res){
    // res.send("signup pages")
	res.render('signup');
});


router.post('/', function(req,res){
    // console.log("got into controller");
    var data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phoneno:req.body.phoneno
    };

    if(req.body.password==req.body.cpassword)
    {
        signupModel.validateUser(data,function(valid)
				{
					if(valid)
					{
						res.redirect('./login');
					}
					else
					{
						// res.redirect('/error');
                        console.log('Error in validating');
					}
				});
    }else{
        console.log("Password doesnt match");
    }
});


module.exports = router;