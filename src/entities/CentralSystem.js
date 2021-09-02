const logger = require("@dojot/dojot-module-logger").logger;
const rest = require("../dojot/http/rest.js");
const command = require("../Commands.js");
const restDevice = require("../dojot/templates/history.js"); 


const TAG = { filename: 'CentralSystem' };

class CentralSystem {
  constructor(agent) {
    this._agent = agent;
  }

  bootNotification(payload, tenant, id) {
    try {
      if (payload) {
//           this._agent.getTemplate();
           let deviceInfo = null;
	   restDevice.get('/device', (response) => { 
	     if(response.data.devices == [] || response.data.devices.length === 0)
		 deviceInfo = {idDispositivo: null,nomeDispositivo:null};
             else{ 

               deviceInfo = {idDispositivo:response.data.devices[0].id,nomeDispositivo:response.data.devices[0].label};
   	      //if(!deviceInfo){
               let templates = this._agent.getTemplate();
               let data = { label: id, templates };
               rest.post('/device', JSON.stringify(data), (response) => {
                 logger.debug('Device create on dojot', TAG);
                 let deviceId = response.data.devices[0].id;
                 this._agent.addDevice(id,deviceId)
                 this.updateAttributes(payload, deviceId, tenant, id, 'bootNotificationReq');
    	      //}
                },
                (error) => {
                  logger.error('Error to create device: ' + error, TAG);
                });
	      }
	    });
          } else {
            logger.info("Dispositivo ja criado");
            logger.info(deviceInfo);
            this.updateAttributes(payload, deviceInfo, tenant, id, 'bootNotificationReq');
          }
      } catch (e) {
        logger.error(e, TAG);
      }
    }
  

  StartTransaction(payload, tenant, id) {
    logger.info(payload);
    if (payload) {
      let deviceInfo = this._agent.getDeviceMap(id);
      logger.info(deviceInfo);
      if (deviceInfo) {
        this.updateAttributes(payload, deviceInfo, tenant, id, 'startTransactionReq');
      }
    }
  }

  StatusNotification(payload, tenant, id) {
    logger.info(payload);
    if (payload) {
      let deviceInfo = this._agent.getDeviceMap(id);
      logger.info(deviceInfo);
      if (deviceInfo) {
        this.updateAttributes(payload, deviceInfo, tenant, id, 'statusNotificationReq');
      }
    }
  }

  DataTransfer(payload, tenant, id) {
    logger.info(payload);
    if (payload) {
      let deviceInfo = this._agent.getDeviceMap(id);
      logger.info(deviceInfo);
      if (deviceInfo) {
        this.updateAttributes(payload, deviceInfo, tenant, id, 'dataTransferReq');
      }
    }
  }



  Authorize(payload, tenant, id) {
    logger.info(payload);
    if (payload) {
      let deviceInfo = this._agent.getDeviceMap(id);
      logger.info(deviceInfo);
      if (deviceInfo) {
        this.updateAttributes(payload, deviceInfo, tenant, id, 'authorizeReq');
      }
    }
  }

  Heartbeat(payload, tenant, id) {
    logger.info(payload);
    if (payload) {
      let deviceInfo = this._agent.getDeviceMap(id);
      logger.info(deviceInfo);
      if (deviceInfo) {
        this.updateAttributes(payload, deviceInfo, tenant, id, 'heartbeatReq');
      }
    }
  }


  StopTransaction(payload, tenant, id){
    logger.info(payload);
    if(payload){
      let deviceInfo = this._agent.getDeviceMap(id);
      logger.info(deviceInfo);
      if(deviceInfo){
        this.updateAttributes(payload, deviceInfo, tenant, id,'stopTransactionReq');
      }
    }
  }

  MeterVelues(payload, tenant, id){
    logger.info(payload);
    if(payload){
      let deviceInfo = this._agent.getDeviceMap(id);
      logger.info(deviceInfo);
      if(deviceInfo){
        this.updateAttributes(payload, deviceInfo, tenant, id,'meterValuesReq');
      }
    }
  }


	makeid(length) {
	   var result           = '';
	   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	   var charactersLength = characters.length;
	   for ( var i = 0; i < length; i++ ) {
	      result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return result;
	}

  updateAttributes(payload, deviceId, tenant, id,command) {
    logger.info(payload);
    payload[3]['chargePoint'] = id;
    payload[3]['deviceId'] = deviceId;
    payload[3]['command'] = payload[2];
        if (!payload[3].hasOwnProperty('correlationId')) {
            payload[3]['correlationId'] = payload[1];
        }
        logger.info('depois' + payload);
    let data = new Object();
    data[command] = {
      ...payload[3]
    }
    logger.info(data);

    this._agent._iotAgent.updateAttrs(deviceId,
      tenant,
      data,
      {}
    )
  }



  response(payload, tenant, id){

    logger.debug("Message to publish: ",payload)
    let deviceId = this._agent.getDeviceMap(id);
    let atribure = this._agent.getMapCommand(payload[1]);
    let uuid= payload[1];

    let data = new Object();

    data[atribure]={
      ...payload[2],
      "chargePoint":id,
      "deviceId": deviceId,
      "correlationId":uuid
    }

    logger.info('Publish to dojot:' + JSON.stringify(data));

    this._agent._iotAgent.updateAttrs(deviceId,
      tenant,
      data,
      {}
    )
  }

}

module.exports = CentralSystem;

