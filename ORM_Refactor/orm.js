
var Sequelize = require("sequelize");
var sequelize = new Sequelize('chat','root','SyNr3GPg');

var User = sequelize.define('Users', {
	username: Sequelize.STRING
});

var Message  = sequelize.define('Message',{
	username: Sequelize.STRING,
	text: Sequelize.STRING
});

User.hasMany(User, {as: 'messages'});

User.sync().success(function(){
	// console.log("User DB Created");
});

Message.sync().success(function(){

	for(var i=0; i<5; i++){
		if(i%2===0){
		var newMessage = Message.build({username : "neil", text: "hellolo world"+i});
		newMessage.save();	
		} else {
			var newMessage = Message.build({username : "roger", text: "style guide"+i});
		newMessage.save();	
		}
	}
});
// 
exports.getMessages = function(response){
	Message.sync().success(function(){
			Message.findAll({}).success(function(msg){
				var data = {}; data.results=[];
				for(var i=0; i<msg.length; i++){
					data.results.push({username: msg[i].username, text: msg[i].text});
				}
			response.end(JSON.stringify(data));
		});
	});
};

exports.postMessage = function (msg,response){
	// console.log("In Post message of ORM");
	var newMsg = Message.build(msg)
	newMsg.save().success(function(){
		console.log("ORM Message saved sucessfully");
		var data = {};
		response.end(JSON.stringify(data));
	})
}

