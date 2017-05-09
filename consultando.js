var Q = require('q'); //requiring a module. Q -> promise module needed for flow control
var request = require('request');


var getData = function(){
	var getDataDefer = Q.defer();

	request(
		{
			url:"https://bbb18f09-e4f0-45dd-a985-18ca74d6accc-bluemix.cloudant.com/prova/",
			method:"POST", //get, post, put, delete
			json:{
				"selector":{"NAME":"NAME 10"},
				"fields":[]
			}
		},
		function(err,response,body){
			if(err){
				getDataDefer.reject({"status":response.statusCode, "body":err});
			}
			else{
				getDataDefer.resolve({"status":response.statusCode, "body":body});
			}
		});
	return getDataDefer.promise;
} 

getData()
.then(function(data){
	console.log("Data: ", JSON.stringify(data) );
});
