import * as net  from 'net';
import * as _ from 'lodash';
const Store = require('electron-store');
import { ipcMain } from 'electron';
import { getInterfaces } from './interfaces';


export function callForOpen() {
  const store = new Store();
  ipcMain.on('call-for-door', (e) => {
    const ifaceName = store.get('iface', '');
    const interfaceData = _.find(getInterfaces(), iface => iface.name === ifaceName);
    if (interfaceData) {
      const client = net.createConnection({port: 1234, host: '192.168.4.1', localAddress: interfaceData.addr});
      client.setTimeout(5000);
      client.on('data', (data) => {
        const msg = data.toString();
        if (msg === "200") {
          e.sender.send('call-foor-door-status', "OPEN_SUCESS");
        } else {
          e.sender.send('call-foor-door-status', "CONFILIC");
        }
        client.end();
      });

      client.on('timeout', () => {
        e.sender.send('call-foor-door-status', "NOT_RESPONDING");
      });

      client.on('error', () => {
        e.sender.send('call-foor-door-status', "SOMETHING_WENT_WRONG");
      });

    } else {
      e.sender.send('call-foor-door-status', "NO_INTERFACE_CONNECTED");
    }

  })
}
