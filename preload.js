const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  variable: 'Hello World!',
  ping: () => ipcRenderer.invoke('ping')
  // we can also expose variables, not just functions
})

//  Preload script is sandboxed after electron 20 (no direct Node.js access).
//  Main process handles all Node.js operations(fs.readFileSync).
//  Renderer only requests data(no direct access to fs).
//  IPC keeps communication secure(no require in the renderer).