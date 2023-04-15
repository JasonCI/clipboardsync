/**
 * @module preload
 */

export {sha256sum} from './nodeCrypto';
export {versions} from './versions';

import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electron', {
  onClipboard: (callback: () => void) => ipcRenderer.on('clipboard', callback),
  setClipboard: (data: any) => {
    ipcRenderer.send('set-clipboard', data);
  },
  store: {
    get(key:string) {
      return '11'||ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property:string, val:any) {
      ipcRenderer.send('electron-store-set', property, val);
    },
  },
});
