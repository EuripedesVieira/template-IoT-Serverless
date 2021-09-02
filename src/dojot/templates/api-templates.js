const { logger } = require('@dojot/dojot-module-logger');
const dojot_api = require('../http/axios');
const {getHeaders} = require('../http/header.js');

function getTemplate(){
  let headers = getHeaders();
  return Promise
  .resolve().then(() => {
    return dojot_api.get('template?page_size=100&page_num=1',headers)
    .then(response => {
      let templates = [];
      let data = response.data.templates;

      if(data){
        for(let id in data){
          let template = data[id];
          templates[template.label]=template.id
        }
        return templates;
      }

      return null;
    })
    .catch(error => {
      console.log(error.toString())
    })
  })
}

function createTemplateThen(data){
  let header=  getHeaders();
  return Promise
  .resolve().then(() => {
       return dojot_api.post('template',data,header).then(data=>{
          logger.info(data.data.template);
          let id = data.data.template.id;
          let label= data.data.template.label 
          
          return {
            id,label
          }
        })
        .catch(error=>console.log(error))
      }) .catch(error=>console.log(error))  
}


module.exports={getTemplate,createTemplateThen};