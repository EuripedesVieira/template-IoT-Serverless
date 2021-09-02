
let command = {
  BOOT_NOTIFICATION:'BootNotification',
  Authorize: 'Authorize',
  Heartbeat: 'Heartbeat',
  StopTransaction:'StopTransaction',
  StartTransaction:'StartTransaction',
  StatusNotification:'StatusNotification',
  MeterValues:'MeterValues',
  DiagnosticsStatusNotification:'DiagnosticsStatusNotification',
  FirmwareStatusNotification:'FirmwareStatusNotification',
  RemoteStartTransaction:'RemoteStartTransaction',
  RemoteStopTransaction:'RemoteStopTransaction',
  GetConfiguration:'GetConfiguration',
  ChangeConfiguration:'ChangeConfiguration',
  Reset:'Reset',
  ChangeAvailability:'ChangeAvailability',
  UnlockConnector:'UnlockConnector',
  ClearCache:'ClearCache',
  DataTransfer: 'DataTransfer',
  DataTransferCpo: 'DataTransferCpo'
}

let commandConf = {
	bootNotificationConf:'bootNotificationConf'
}

module.exports = command;
