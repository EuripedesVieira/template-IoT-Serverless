const axios = require("axios");

const CENTRAL_SYSTEM_URL = process.env.CENTRAL_SYSTEM_URL || "http://device-manager:5000";
axios.defaults.baseURL = CENTRAL_SYSTEM_URL;

const dojot_api = axios.create({
  baseURL: CENTRAL_SYSTEM_URL
})

module.exports=dojot_api;