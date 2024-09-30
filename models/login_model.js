var db=require('../dbserver.js');

var loginData=function(data,callback)
{
	var sql='SELECT * from usertable where email=?';

	var param=[data.email];
    // console.log(param);
	db.getData(sql,param,function(result){
		
		if(result.length==0 || result==null)
		{
			callback(false);
		}
		else
		{
			// if(passwordHash.verify(data.password,result[0].password))
			if(data.password==result[0].password)
            {				
				callback(result);	
			}
			else
				callback(false);
		}
	});
}

module.exports.loginData=loginData;