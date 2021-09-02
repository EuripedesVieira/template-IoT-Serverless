'use strict';
const ChargePointServer = require('./entities/ChargePointServer');
const ChargePoint = require('./entities/ChargePoint');
const CentralSystem = require('./entities/CentralSystem');
const IotAgent = require('@dojot/iotagent-nodejs');
const Agent = require('./entities/Agent');
const Command = require("./getCommandCS");

const { logger } = require('@dojot/dojot-module-logger');
const { json } = require('express');
var config = require("./config/config-dojot");



let iotAgent = new IotAgent.IoTAgent(config);


var cp01 = new ChargePointServer(callbackCon, callbackMes);

cp01.init();

var agent = new Agent(iotAgent, callbackActuate);
agent.init();

var centralSystem = new CentralSystem(agent);
var chargePoint = new ChargePoint(agent, callbackActuate);

function callbackCon(socket, req) {
    let id=req.url.split('/')[1];
    agent.addSession(id, socket);
}


function callbackMes(command, req, data) {
  let id=req.url.split('/')[1];
  data = JSON.parse(data);
  logger.debug("CallBack Message received data and command: ",command);

  if(command === 'BootNotification') {
    centralSystem.bootNotification(data, 'admin', id);
  }

  if (command === 'DataTransfer'){
    centralSystem.DataTransfer(data,'admin',id);
  }

  if (command === 'StatusNotification') {
    centralSystem.StatusNotification(data, 'admin', id);
  }

  if (command === 'StartTransaction') {
    centralSystem.StartTransaction(data, 'admin', id);
  }

  if (command === 'Authorize') {
    centralSystem.Authorize(data, 'admin', id);
  }

  if (command === 'Heartbeat') {
    centralSystem.Heartbeat(data, 'admin', id);
  }

  if(command === 'StopTransaction'){
    centralSystem.StopTransaction(data, 'admin', id);
  }


  if(command === 'MeterValues'){
    centralSystem.MeterVelues(data, 'admin', id);
  }
  if(command===null){
    centralSystem.response(data,'admin',id);
  }
}

function cleanQuotes (dataString) {
            let contextWithoutSlash = dataString.replace(/\\/g,'');

            let contextWithoutQuotes = contextWithoutSlash
                 .substring(1,contextWithoutSlash.length-1);

console.log(contextWithoutQuotes)
            let contextJSON = JSON.parse('{' + contextWithoutQuotes + '}');

            return contextJSON;
        }


function callbackActuate(event, idCP){ 

  logger.info("Actuate received id: ",idCP,"index");
  logger.info("Event from actuate",event,"index");
  if (!event.data.attrs){
    logger.warn('Callback actuate received: Payload Void!','index')
    logger.warn('Cancel actuate','index')
    return;
  }
  let message;
  let payloadReceived=event.data.attrs.payload;
  if(payloadReceived){
    logger.debug('Callback actuate received:' + payloadReceived,"index");
    let data = payloadReceived;
    data = data.substring(1,data.length-1)
    data = data.replace(/\\/g,'')
    data = JSON.parse(data)
    message = JSON.stringify([3, data.correlationId, JSON.stringify(Object.values(data)[0])])
  }else{

      let data=Object.keys(event.data.attrs)[0];

      logger.debug('Callback actuate received:' + JSON.stringify(event.data.attrs),"index");

      payloadReceived = event.data.attrs;
      let payloadToSend = payloadReceived;
      let uuid;

      if (data == 'bootNotificationConf'){
        payloadToSend = payloadReceived[data]
        uuid=payloadToSend.correlationId
        payloadToSend = payloadToSend.bootNotificationAns;
      } else if (data == 'heartbeatConf') {
	payloadToSend = cleanQuotes(payloadToSend[data]);
         console.log(payloadToSend)
         uuid=payloadToSend.correlationId
         payloadToSend = payloadToSend.heartBeatAns
      } else if (data == 'statusNotificationConf'){
        payloadToSend = payloadReceived[data]
	uuid=payloadToSend.correlationId
        payloadToSend = payloadToSend.statusNotificationAns
      } else if (data == 'authorizeConf'){
	payloadToSend = payloadReceived[data]
        uuid=payloadToSend.correlationId
        payloadToSend = payloadToSend.authorizeAns
      } else if (data == "dataTransferConf"){
	payloadToSend = payloadReceived[data]
        uuid=payloadToSend.correlationId
        payloadToSend = payloadToSend.dataTransferAns
      } else{
        if (typeof payloadReceived[data] !== 'object'){
          payloadToSend = JSON.parse(payloadReceived[data]);
        }else{
          payloadToSend = payloadReceived[data]
        }
        uuid=payloadToSend.correlationId;
        delete payloadToSend.correlationId;
      }

      let dataCommand = Command[data];
      agent.addMapCommand(uuid,dataCommand);
      delete payloadReceived.correlationId;
	if (data.endsWith('Req')){
	  if (dataCommand === "DataTransferCpo"){
	    dataCommand = "DataTransfer";
	  }
           message = JSON.stringify([2, uuid,dataCommand,payloadToSend])
	} else {
	  if (data === 'stopTransactionConf'){
	    message = JSON.stringify([3,payloadToSend])
          }else{
            message = JSON.stringify([3, uuid,payloadToSend])
          }
        }
    // }
  }

  if(message){
    try{
      logger.info(message,"index");
      chargePoint.sendMessageCP(message,idCP);
    } catch (error){
      logger.info(error);
    }
  }

}
