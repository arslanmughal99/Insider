/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-const */
import * as os from 'os';
import { ipcMain } from 'electron';
import * as _ from 'lodash';



export function getIfaces() {
  ipcMain.on('get-all-ifaces', e => {
    const interfaceIP = getInterfaces();
    e.sender.send(
      'all-ifaces',
      _.sortBy(interfaceIP, each => each.name.length)
    );
  });
}


export function getInterfaces() {
  const allInterfaces = os.networkInterfaces();
  let interfaceIP = [];
  _.mapKeys(allInterfaces, (value, key) => {
    interfaceIP.push({ name: key, addr: value[1].address });
  });
  return interfaceIP;
}
