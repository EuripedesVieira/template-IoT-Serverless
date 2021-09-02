const templates=[];


templates["Authorize"]={ 
  "label":"Authorize",
  "attrs":[
    {
      "label": "authorizeReq",
      "type": "dynamic",
      "value_type": "object"
    },
    {
      "label": "authorizeConf",
      "type": "dynamic",
      "value_type": "object"
    }
  ]
};

templates["StartTransaction"]={
  "label":"StartTransaction",
  "attrs":[
    {
      "label": "startTransactionReq",
      "type": "dynamic",
      "value_type": "object"
    },
    {
      "label": "startTransactionConf",
      "type": "dynamic",
      "value_type": "object"
    }
  ]
};

templates["StopTransaction"]={
  "label":"StopTransaction",
  "attrs":[
    {
      "label": "stopTransactionReq",
      "type": "dynamic",
      "value_type": "object"
    },
    {
      "label": "stopTransactionConf",
      "type": "dynamic",
      "value_type": "object"
    }
  ]
};

templates["StatusNotification"]={
  "label":"StatusNotification",
  "attrs":[
    {
      "label": "statusNotificationReq",
      "type": "dynamic",
      "value_type": "object"
    },
    {
      "label": "statusNotificationConf",
      "type": "dynamic",
      "value_type": "object"
    }
  ]
};

templates["MeterValues"]={
  "label":"MeterValues",
  "attrs":[
    {
      "label": "meterValuesReq",
      "type": "dynamic",
      "value_type": "object"
    },
    {
      "label": "meterValuesConf",
      "type": "dynamic",
      "value_type": "object"
    }
  ]
};

templates["Heartbeat"]={
  "label":"Heartbeat",
  "attrs":[
    {
      "label": "heartbeatReq",
      "type": "dynamic",
      "value_type": "object"
    },
    {
      "label": "heartbeatConf",
      "type": "dynamic",
      "value_type": "object"
    }
  ]
}

templates["FirmwareStatusNotification"]={
  "label":"FirmwareStatusNotification",
  "attrs":[
    {
      "label": "firmwareStatusNotificationReq",
      "type": "dynamic",
      "value_type": "object"
    },
    {
      "label": "firmwareStatusNotificationConf",
      "type": "dynamic",
      "value_type": "object"
    }
  ]
};

templates["DiagnosticsStatusNotification"]={
  "label":"DiagnosticsStatusNotification",
  "attrs":[
    {
      "label": "diagnosticsStatusNotificationReq",
      "type": "dynamic",
      "value_type": "object"
    },
    {
      "label": "diagnosticsStatusNotificationConf",
      "type": "dynamic",
      "value_type": "object"
    }
  ]
};

templates["BootNotification"]={
  "label":"BootNotification",
  "attrs":[
    {
      "label": "bootNotificationReq",
      "type": "dynamic",
      "value_type": "object"
    },
    {
      "label": "bootNotificationConf",
      "type": "dynamic",
      "value_type": "object"
    }
  ]
}

templates["ClearCache"]={
  "label":"ClearCache",
  "attrs":[
    {
      "label": "clearCacheReq",
      "type": "dynamic",
      "value_type": "object"
    },
    {
      "label": "clearCacheConf",
      "type": "dynamic",
      "value_type": "object"
    }
  ]
}



module.exports=templates;

/*




module.exports={
  Authorize:{ 
    "label":"Authorize",
    "attrs":[
      {
        "label": "authorizeReq",
        "type": "dynamic",
        "value_type": "object"
      },
      {
        "label": "authorizeConf",
        "type": "dynamic",
        "value_type": "object"
      }
    ]
  },  
  StartTransaction: {
    "label":"StartTransaction",
    "attrs":[
      {
        "label": "startTransactionReq",
        "type": "dynamic",
        "value_type": "object"
      },
      {
        "label": "startTransactionConf",
        "type": "dynamic",
        "value_type": "object"
      }
    ]
  },  
  StopTransaction:{
    "label":"StopTransaction",
    "attrs":[
      {
        "label": "stopTransactionReq",
        "type": "dynamic",
        "value_type": "object"
      },
      {
        "label": "stopTransactionConf",
        "type": "dynamic",
        "value_type": "object"
      }
    ]
  },  
  StatusNotification:{
    "label":"StatusNotification",
    "attrs":[
      {
        "label": "statusNotificationReq",
        "type": "dynamic",
        "value_type": "object"
      },
      {
        "label": "statusNotificationConf",
        "type": "dynamic",
        "value_type": "object"
      }
    ]
  },  
  MeterValues:{
    "label":"MeterValues",
    "attrs":[
      {
        "label": "meterValuesReq",
        "type": "dynamic",
        "value_type": "object"
      },
      {
        "label": "meterValuesConf",
        "type": "dynamic",
        "value_type": "object"
      }
    ]
  },  
  Heartbeat:{
    "label":"Heartbeat",
    "attrs":[
      {
        "label": "heartbeatReq",
        "type": "dynamic",
        "value_type": "object"
      },
      {
        "label": "heartbeatConf",
        "type": "dynamic",
        "value_type": "object"
      }
    ]
  },  
  FirmwareStatusNotification:{
    "label":"FirmwareStatusNotification",
    "attrs":[
      {
        "label": "firmwareStatusNotificationReq",
        "type": "dynamic",
        "value_type": "object"
      },
      {
        "label": "firmwareStatusNotificationConf",
        "type": "dynamic",
        "value_type": "object"
      }
    ]
  },  
  DiagnosticsStatusNotification:{
    "label":"DiagnosticsStatusNotification",
    "attrs":[
      {
        "label": "diagnosticsStatusNotificationReq",
        "type": "dynamic",
        "value_type": "object"
      },
      {
        "label": "diagnosticsStatusNotificationConf",
        "type": "dynamic",
        "value_type": "object"
      }
    ]
  },  
  BootNotification:{
    "label":"BootNotification",
    "attrs":[
      {
        "label": "bootNotificationReq",
        "type": "dynamic",
        "value_type": "object"
      },
      {
        "label": "bootNotificationConf",
        "type": "dynamic",
        "value_type": "object"
      }
    ]
  }  
}*/
