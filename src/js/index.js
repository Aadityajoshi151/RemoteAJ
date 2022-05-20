const { ipcRenderer } = require('electron');
const ipc = require("electron").ipcRenderer;
var term = new Terminal();

ipcRenderer.on("quick_connect_toolbar_toggle" , (event, arg) => {
    var quick_connect_div = document.getElementById('quick_connect_toolbar');
    if(!arg){
        quick_connect_div.style.display = 'none';
    }
    else{
        quick_connect_div.style.display = 'block';
    }
});

term.open(document.getElementById('terminal'));

ipc.on("terminal.incomingData", (event, data) => {
    term.write(data);
});

term.onData(e => {
    ipc.send("terminal.keystroke", e);
});