const { ipcRenderer } = require('electron');

ipcRenderer.on("quick_connect_toolbar_toggle" , (event, arg) => {
    var quick_connect_div = document.getElementById('quick_connect_toolbar');
    if(!arg){
        quick_connect_div.style.display = 'none';
    }
    else{
        quick_connect_div.style.display = 'block';
    }
});