var Q = require('q'); //requiring a module. Q -> promise module needed for flow control
var request = require('request');


var deleteData = function(id,rev){
	var deleteDataDefer = Q.defer();
	var id = id;
	var rev = rev;
	request(
		{
			url:"https://bbb18f09-e4f0-45dd-a985-18ca74d6accc-bluemix.cloudant.com/prova/"+id+"?rev="+rev, 
			method:"DELETE", //get, post, put, delete
		},
		function(err,response,body){
			if(err){
				deleteDataDefer.reject({"status":response.statusCode, "body":err});
			}
			else{
				deleteDataDefer.resolve({"status":response.statusCode, "body":body});
			}
		});
	return deleteDataDefer.promise;
} 

deleteData('d5646427419ac724f6aaeab92b24941a','1-d789b463e0985a8a3a11e90c9f530725');
.then(function(data){
	console.log("Data: ", JSON.stringify(data) );
});
