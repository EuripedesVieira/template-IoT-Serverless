const logger = require("@dojot/dojot-module-logger").logger;
const {getTemplate} = require('../dojot/templates/api-templates.js');
const templeteCP = require('../dojot/templates/templetes_cp.json');
const command = require('../Commands.js');
const CommnadsCSconf =require("../getCommandCS.js");
const TAG = { filename: 'Agent' };

class Agent {
    constructor(iotAgent,callbackActuate) {
        this._iotAgent = iotAgent;
        this._dojotDevicesInfo = {};
        this._mapDevices = new Map();
        this._mapSessions = new Map();
        this._callbackActuate = callbackActuate;
        this._templates=[];
        this.mapDeviceCP= new Map();
        this.mapCommands= new Map();
    }

    addMapCommand(uuid,commandcp){
        let atribute = CommnadsCSconf[commandcp];
        this.mapCommands.set(uuid,atribute);      
    }

    getMapCommand(uuid){
        let atribute = this.mapCommands.get(uuid);
        if(atribute){
            this.mapCommands.delete(uuid);
            return atribute;
        }
    }

    _createDeviceInfo(event) {
        let tenant = event.meta.service;
        let deviceId = event.data.id;
        let deviceName = event.data.label;

        this._dojotDevicesInfo[deviceId] = {
            tenant,
            deviceId,
            deviceName
        };
    }

    getDeviceMap(cpId) {
        return this._mapDevices.get(cpId);
    }

    getSessionMap(dojotId) {
        return this._mapSessions.get(dojotId);
    }

    getTemplate(){
      	let listTemplate=[];
	for(let i in this._templates){
		listTemplate.push(this._templates[i]);
	}
	return listTemplate;
    }

    addSession(cpId, session) {
        this._mapSessions.set(cpId,session);
    }

    addDevice(cpId, dojotId) {
        this._mapDevices.set(cpId,dojotId);
        this.mapDeviceCP.set(dojotId,cpId);
    }


    _getDeviceCP(event){
        let deviceDojot = event.data.id;
        let deviceCP = this.mapDeviceCP.get(deviceDojot);
        if(deviceCP)
            return deviceCP;
    }

    _pushTemplate(templates){
        if (templates[command.Authorize]) this._templates[command.Authorize] = templates[command.Authorize];
        if (templates[command.BOOT_NOTIFICATION]) this._templates[command.BOOT_NOTIFICATION] = templates[command.BOOT_NOTIFICATION];
        if (templates[command.Heartbeat]) this._templates[command.Heartbeat] = templates[command.Heartbeat];
        if (templates[command.MeterValues]) this._templates[command.MeterValues] = templates[command.MeterValues];
        if (templates[command.StartTransaction]) this._templates[command.StartTransaction] = templates[command.StartTransaction];
        if (templates[command.StatusNotification]) this._templates[command.StatusNotification] = templates[command.StatusNotification];
        if (templates[command.StopTransaction]) this._templates[command.StopTransaction] = templates[command.StopTransaction];
        if (templates[command.DiagnosticsStatusNotification]) this._templates[command.DiagnosticsStatusNotification] = templates[command.DiagnosticsStatusNotification];
        if (templates[command.FirmwareStatusNotification]) this._templates[command.FirmwareStatusNotification] = templates[command.FirmwareStatusNotification];

        if (templates[command.RemoteStartTransaction]) this._templates[command.RemoteStartTransaction] = templates[command.RemoteStartTransaction];
        if (templates[command.RemoteStopTransaction]) this._templates[command.RemoteStopTransaction] = templates[command.RemoteStopTransaction];
        if (templates[command.GetConfiguration]) this._templates[command.GetConfiguration] = templates[command.GetConfiguration];
        if (templates[command.ChangeConfiguration]) this._templates[command.ChangeConfiguration] = templates[command.ChangeConfiguration];
        if (templates[command.ChangeAvailability]) this._templates[command.ChangeAvailability] = templates[command.ChangeAvailability];
        if (templates[command.Reset]) this._templates[command.Reset] = templates[command.Reset];
        if (templates[command.UnlockConnector]) this._templates[command.UnlockConnector] = templates[command.UnlockConnector];
        if (templates[command.ClearCache]) this._templates[command.ClearCache] = templates[command.ClearCache];
	if (templates[command.DataTransfer]) this._templates[command.DataTransfer] = templates[command.DataTransfer];
 	if (templates[command.DataTransferCpo]) this._templates[command.DataTransferCpo] = templates[command.DataTransferCpo];
    }

    addTemplate(label,id){
      this._templates[label]=id;
    }

    registrarElementosDoMapa(valor, chave, mapa) {
      console.log(`m[${chave}] = ${valor}`);
    }

    createTemplate(){
      for(let id in templeteCP){
        let data = templeteCP[id]; 
        if(this._templates[data.label]){
          logger.info("Template Existente");
          logger.info(this._templates[data.label])
        }else{
					createTemplateThen(data).then(dat=>{
						logger.info("Dentro co create Template Then");
						this.addTemplate(dat.label,dat.id)
					});
				}
			}
		}

    init() {
        this._iotAgent.init().then(() => {

            getTemplate().then(data=>{
              logger.info("Retrieve all templates")
  	      this._pushTemplate(data);
	      //this.createTemplate();
            })


            logger.debug(`Succeeded to start the HTTP IoT Agent `, TAG);
            // Handle device.create event
            this._iotAgent.messenger.on('iotagent.device', 'device.create', (tenant, event) => {
                logger.debug(`Received device.create event ${JSON.stringify(event)} for tenant ${tenant}.`, TAG);
            });

            // Handle device.update event
            this._iotAgent.messenger.on('iotagent.device', 'device.update', (tenant, event) => {
                logger.debug(`Received device.update event ${JSON.stringify(event)} for tenant ${tenant}.`, TAG);
            });

            // Handle device.remove event
            this._iotAgent.messenger.on('iotagent.device', 'device.remove', (tenant, event) => {
                logger.debug(`Received device.update event ${JSON.stringify(event)} for tenant ${tenant}.`, TAG);
                
                let idDojot = event.data.id;
                let idCP = this._getDeviceCP(event);

                this._mapDevices.delete(idCP);
                this.mapDeviceCP.delete(idDojot);
                this._mapSessions.delete(idCP);
            });

    
            this._iotAgent.messenger.on('iotagent.device', 'device.configure', (tenant, event) => {
                logger.debug(`Received device.actuate event ${JSON.stringify(event)} for tenant ${tenant}.`, TAG);
                let deviceCP = this._getDeviceCP(event);
                this._callbackActuate(event,deviceCP);
            });


            // force device.create events for devices created before starting the iotagent
            this._iotAgent.messenger.generateDeviceCreateEventForActiveDevices();


        }).catch((error) => {
            logger.error(`Failed to initialize the HTTP IoT Agent (${error})`, TAG);
        });

    }
}

module.exports = Agent;
