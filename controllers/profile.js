var express=require('express');
userModel=require.main.require('./models/user_model');
var router=express.Router();

// router.get('/',function(req,res){
//     // res.send("signup pages")
// 	res.render('profile');
// });

router.get('/',function(req,res){
	var data={
		email: req.session.loggedUser
	}
	userModel.user(data,function(result){
		if(result)
		{
            // console.log("Result in controller:", result);
			res.render('profile',{result: result});
		}
		else
		{
            console.log("No data found for the user. ");
			// res.redirect('/error');
		}
	});
});
module.exports=router;
