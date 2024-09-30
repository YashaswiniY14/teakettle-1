var db=require('../dbserver.js');


// var productlist = function(callback){
//             var sql='SELECT * FROM userdb.product_details';

            // db.getAllData(sql,function(result){
            //     if(result.length==0 || result==null)
            //     {
            //         callback(false);
            //     }
            //     else
            //     {
            //         callback(result);
            //     }
//             });
//         }
    

var productlist = function(callback) {
        const sql = 'SELECT pd.*  FROM userdb.product_details pd ORDER BY pd.product_id';
        
        db.getAllData(sql, function(results) {
            if(results.length==0 || results==null)
                {
                    callback(false);
                }
                else
                {
                    callback(results);
                }
           
        });
    }

var productOptions=function(callback) {
        const sql ='SELECT pd.product_id, pp.quantity, pp.price FROM userdb.product_details pd JOIN userdb.product_price pp ON pd.product_id = pp.product_id ORDER BY pd.product_id, pp.quantity';
        
        db.getAllData(sql, function(results) {
            if(results.length==0 || results==null)
                {
                    callback(false);
                }
                else
                {
                    callback(results);
                }
        });
    }


// module.exports = productModel;
module.exports.productlist=productlist;
module.exports.productOptions=productOptions;