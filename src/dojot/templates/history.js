const { logger } = require("@dojot/dojot-module-logger");
const axios = require("../http/axios.js");
const { getHeaders } = require('../http/header.js');

function get(url, onsuccess, onerror) {
    let headers = getHeaders();
    axios.get(url, headers).then((response) => {
      logger.info('Logger de get: ',response)
      onsuccess(response);
    }).catch((error) => {
      logger.info('Error de get: ',error)
      onerror(error);
    });
  }

function hist(device) {
    console.log('ID do Device a pesquisar:',device)
    const history = `http://device-manager:5000/device/${device}`;
    axios.defaults.baseURL = history;
    logger.info(`alouuu: ${history}`)
    logger.info(`alouuu: ${axios.defaults.baseURL
        }`)

    const axios = axios.create({
        baseURL: history
    })
    return axios.get(history, getHeaders()).then((response) => {
        return response.data.bootNotificationReq[0].device_id;
    }).catch(err => {
        console.log('err: ', err)
    })
}

function listDevices() {
    const devices = "http://device-manager:5000/device";
    axios.defaults.baseURL = devices;

    const axios = axios.create({
        baseURL: devices
    })
    return dojot_api.get(devices, getHeaders()).then((response) => {
        console.log('retorn log : ',response.data.devices.length)
        if(response.data.devices == [] || response.data.devices.length === 0)return {idDispositivo: null,nomeDispositivo: null}
        else return {idDispositivo:response.data.devices[0].id,nomeDispositivo:response.data.devices[0].label};
    }).catch(err => {
        console.log('err: ', err)
    })
}

module.exports = {get: get};