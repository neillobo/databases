var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "SyNr3GPg",
  database: "chat"
});
	dbConnection.connect();

/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/
exports.getMessages = function(response){
	var queryString = "Select * from messages;";
	dbConnection.query(queryString, function(err,dbResults){
		if(err){
			throw err;
		}
		var data = {}; data.results=[];
		 for(var i = 0; i < dbResults.length; i++){
        data.results.push(dbResults[i]);
     }
		response.end(JSON.stringify(data));
	})
}; 

exports.postMessage = function(message,response){
	console.log("The message received is ",message);
	var queryString = "insert into messages (text,username,roomname) values ('"+message.text+"','"+message.username+"','"+message.roomname+"');";
	// var queryString="insert into messages (text,username,roomname) values('Witches','Moon','Somebody');";
	dbConnection.query(queryString, function(err,dbResults){
		if(err){
			throw err;
		}
		console.log("Message added to database");
		var data = {};
		response.end(JSON.stringify(data));
	});
};



