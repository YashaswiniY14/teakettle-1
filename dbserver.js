const express = require("express")
const app = express()
const mysql = require("mysql2")
require("dotenv").config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})

// const db = mysql.createPool({
//    connectionLimit: 100,
//    host: "127.0.0.1",       //This is your localhost IP
//    user: "user1",         // "newuser" created in Step 1(e)
//    password: "krishnayashu",  // password for the new user
//    database: "userDB",      // Database name
//    port: "3306"             // port name, "3306" by default
// })
db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

module.exports={
	insertData: function(sql,param,callback){
		console.log(param);
		if(param==null)
		{
			db.query(sql,function(error,result){
				if (error) {
					callback(null);
				}
				else
				{
					callback(result);
				}
			});
			
		}
		else
		{
			db.query(sql,param,function(error,result){
				if (error) {
					callback(null);
				}
				else
				{
					callback(result);
				}
			});
		}

	},
	getAllData: function(sql,callback){
		
		db.query(sql,function(error,result){
			if(error)
			{
				
				callback(null);

			}
			else
			{
				callback(result);
			}
		});
	},
	getData : function(sql,param,callback){
		if(param==null)
		{
			db.query(sql,function(error,result){
				if (error) {
					callback(null);
				}
				else
				{
					callback(result);
				}
			});
			
		}
		else
		{
			db.query(sql,param,function(error,result){
				if (error) {
					callback(null);	
				}
				else
				{
					callback(result);
				}
			});
		}

	},


	deleteData : function(sql,param,callback){

		if(param==null)
		{
			db.query(sql,function(error,result){
				if (error) {
					callback(null);
				}
				else
				{
					callback(result);
				}
			});
			
		}
		else
		{
			db.query(sql,param,function(error,result){
				if (error) {
					callback(null);
				}
				else
				{
					callback(result);
				}
			});
		}

	},
	updateData : function(sql,param,callback){
		if(param==null)
		{
			db.query(sql,function(error,result){
				if (error) {
					callback(null);
				}
				else
				{
					callback(result);
				}
			});
		}
		else
		{
			db.query(sql,param,function(error,result){
				if (error) {
					callback(null);
				}
				else
				{
					callback(result);
				}
			});
		}
	}
};

// const port=process.env.port;
// app.listen(port, 
//     ()=> console.log(`Server Started on port ${port}...`))
// app.listen(port, () => console.log('server started on port: ${port}...'))

