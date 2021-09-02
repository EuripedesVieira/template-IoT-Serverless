const axios = require("./axios.js");
const {getHeaders} = require('./header.js');

function post(url,payload,onsuccess,onerror) {
  let headers = getHeaders();
    axios.post(url, payload,headers).then((response) => {
      onsuccess(response);   
    }).catch((error) => {
        onerror(error);
    });
}

module.exports = {post:post};