var db=require('../dbserver.js');

module.exports={
	user:function(data,callback)
	{
        
        var sql='SELECT * from usertable where email=?';
        var param=[data.email];
        // console.log(param)
        db.getData(sql,param,function(result){
            if(result.length==0 || result==null)
            {
                callback(false);
            }
            else
            {
                // console.log(result);
                callback(result);
            }
        });
    }
};