class ChargePoint {
    constructor(iotAgent) {
        this._agent = iotAgent;
    }

    sendMessageCP(message,Idcp){
      let socket = this._agent.getSessionMap(Idcp)
      socket.send(message)
    }
}
module.exports = ChargePoint