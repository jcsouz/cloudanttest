var Q = require('q'); //requiring a module. Q -> promise module needed for flow control
var request = require('request');


var getData = function(){
	var getDataDefer = Q.defer();

	request(
		{
			url:"https://bbb18f09-e4f0-45dd-a985-18ca74d6accc-bluemix.cloudant.com/teste/_bulk_docs/_find",
			method:"POST", //get, post, put, delete
			json:{
				"selector":{"Cidade":"RJ"},
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
/*
getData()
.then(function(data){
	console.log("Data: ", JSON.stringify(data) );
});
*/

var autoinject = function(){
var jsonPattern = {"NAME":null,"CIDADE":null,"EMAIL":null};
var autoDefer = Q.defer();

for(var i=0;i<100;i++){

	var modJSON = jsonPattern;
	modJSON.NAME = "Name "+i;
	modJSON.CIDADE = "Cidade "+i;
	modJSON.EMAIL = "EMAIL "+i;

	request(
		{
			url:"https://bbb18f09-e4f0-45dd-a985-18ca74d6accc-bluemix.cloudant.com/teste/_bulk_docs",
			method:"POST", //get, post, put, delete
			json:{
				"docs":[modJSON]
			}
		},
		function(err,response,body){
			if(err){
				autoDefer.reject({"status":response.statusCode, "body":err});
				console.log("err: ",err);
			}
			else{
				//autoDefer.resolve({"status":response.statusCode, "body":body});
				console.log("response: ",body);
			}
		});
	if(i+1==100){
		autoDefer.resolve({"status":200, "body":"Check the database !!"});
	}

}

return autoDefer.promise;
}


autoinject().then(function(data){
	console.log("Response: ",data);
});