var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
    // res.send("signup pages")
	res.render('home');
});


module.exports = router;