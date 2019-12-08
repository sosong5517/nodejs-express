// export
//var eesponse function
var response = function(){}
//response message
 response.message = function(code,message,data){
    return {
        code : code,
        message : message,
        data : data
    }
}

response.success = function(data){
    return response.message(0,null,data);
}
response.error = function(code,message){
    return response.message(code,message,null);
}
module.exports = response

//respon sucess
// import di controller
// var response function 
//