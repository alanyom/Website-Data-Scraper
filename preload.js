//preload.js
//contextBridge and ipcRenderer are offered by Electron in order to communicate between preload and node file
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    //sends the user input value through the "send-data" channel in main.js
    sendData: (info) => ipcRenderer.send('send-data', info),
})
//waits to recieve value from "reply" channel before running command
ipcRenderer.on("reply", (_event, arg) => {
    //replaces the <p> with id text with the finalized list
    document.getElementById("text").innerHTML = arg;
  })
  