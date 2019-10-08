import * as Store from 'electron-store';
import { ipcRenderer } from 'electron';
const store = new Store();


export function saveIface(ifaceName) {
  store.set('iface', ifaceName);
}

export function getStoredIface(){
  const ifaceName = store.get('iface');
  return ifaceName;
}


export function getIfaces() {
  const status = new Promise((resolve, reject) => {
    ipcRenderer.send('get-all-ifaces');
    ipcRenderer.once('all-ifaces', (e, ifaces) => {
      if(ifaces){
        resolve(ifaces)
      } else if(!ifaces) {
        reject();
      }
    });
  })
  return status;
}
