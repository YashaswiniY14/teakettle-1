var db=require('../dbserver.js');
var validateUser=function(data, callback){
    // console.log(data);
    var sql= "INSERT INTO usertable (user, email, password, phoneno) VALUES (?, ?, ?, ?) ";
    // var param = ['user2','user2@gmail.com', 'password2','1234567899'];
    
    var param=[data.name, data.email, data.password,  data.phoneno];

    // console.log(param);
    db.insertData(sql, param, function(result) {
        if (result) {
            console.log('Data inserted successfully:', result);
            callback(true);
        } else {
            console.log('Error inserting data');
            callback(false);
        }
    });

}

module.exports.validateUser=validateUser;
// let sql = "INSERT INTO usertable ( user, password) VALUES (?, ?)";
// let params = ['user1@gmail.com', 'password1']; // Replace with actual values

// db.insertData(sql, params, function(result) {
//   if (result) {
//     console.log('Data inserted successfully:', result);
//   } else {
//     console.log('Error inserting data');
//   }
// });