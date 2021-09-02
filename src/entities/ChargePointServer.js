const logger = require("@dojot/dojot-module-logger").logger;
const TAG = { filename: 'chargePointServer' };
const fs = require('fs');
const https = require('https');
const http = require('http');
var express = require('express');
const WebSocket = require('ws');

const secureConnection = process.env.SECURE || false;
const CERT = process.env.CERT || "./cert.pem";
const CERT_KEY = process.env.CERT_KEY || "./key.pem";
const SERVER_PORT = process.env.SERVER_PORT || 8543;
const COMMNAD = require("../Commands");




var server;



class ChargePointServer {
  constructor(callbackConnection, callbackOnMessage) {
    this._callbackConnection = callbackConnection;
    this._callbackOnMessage = callbackOnMessage
  }


	init() {
    logger.debug(`Initizalizing Charge Point Server`, TAG);
    try {
      var app = express();
      if(secureConnection){
        server = new https.createServer({
        cert: fs.readFileSync(CERT),
        key: fs.readFileSync(CERT_KEY)
      	});
      }else{
        server = http.createServer(app)
      }
      
      this.socket = new WebSocket.Server({ server:server });
      this.socket.on('error',(error)=>{
        logger.error(error);
      })
      this.socket.on('connection', (ws, req) => {
				try{
					logger.debug(`Socket start connection`, TAG);
					ws.on('message', (message) => {
					this._receiveMessage(message,req, ws,this._callbackOnMessage);
					});
				}catch (error) {
					logger.error(error, TAG);
				}
      });

	server.listen(SERVER_PORT, () => {
        logger.info(`Server listen on ${SERVER_PORT}`, TAG);
      });

    }catch(error){
      logger.error(error, TAG);
      }
  }

	_receiveMessage(message,req,ws,callback) {
		logger.debug(`Message received: ${message}`, TAG);
		logger.info(message)
		
		let type= this._getTypeMessage(message);
		switch (type) {
			case 2:
        let command =this.getCommand(message);
        if(command==="BootNotification"){
          this._callbackConnection(ws, req);
        }
		callback(command,req, message);
		break;

	case 3:
		callback(null,req,message);										
		break;						
	default:
		break;
	}
  }

  
  getCommand(data){
    try {
      var messageObj = this._convertArray(data);
      logger.info(messageObj);
      logger.info("\n esse quero testar")
      let command = messageObj.filter(x => {
          if (x === 'BootNotification') return COMMNAD.BOOT_NOTIFICATION;
          if (x === 'Authorize') return COMMNAD.Authorize;
          if (x === 'Heartbeat') return COMMNAD.Heartbeat;
          if (x === 'StopTransaction') return COMMNAD.StopTransaction;
          if (x === 'StartTransaction') return COMMNAD.StartTransaction;
          if (x === 'StatusNotification') return COMMNAD.StatusNotification;
          if (x === 'MeterValues') return COMMNAD.MeterValues;
          if (x === 'GetConfiguration') return COMMNAD.GetConfiguration;
	  if (x === 'ChangeConfiguration') return COMMNAD.ChangeConfiguration;
	  if (x === 'DataTransfer') return COMMNAD.DataTransfer;
      });
      
      return command[0];
    }catch(error){
      logger.error(error, TAG);
    }
  }

  _convertArray(data){
    if(data){
      let array=JSON.parse(data);
      return array;
    };
  };


  _getTypeMessage(message){
      return this._convertArray(message)[0];
  }

}

module.exports = ChargePointServer
