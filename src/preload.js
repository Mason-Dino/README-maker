// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require('electron');
const fs = require('fs');

contextBridge.exposeInMainWorld('electronAPI', {
    writeFile: (filename, content, callback) => fs.writeFile(filename, content, callback)
});