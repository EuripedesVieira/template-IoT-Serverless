const { logger } = require("@dojot/dojot-module-logger");

function getManagementToken() {
    const payload = {
        service: 'admin',
        username: 'admin'
    };
    return (
        new Buffer("jwt schema").toString("base64") +
        "." +
        new Buffer(JSON.stringify(payload)).toString("base64") +
        "." +
        new Buffer("dummy signature").toString("base64")
    );
}

 function getHeaders(){
   logger.info(getManagementToken());
   return{
    headers: {
      'Authorization': "Bearer " + getManagementToken(),
      'Content-Type': 'application/json',
    }
   }
 }

module.exports={
  getHeaders
}