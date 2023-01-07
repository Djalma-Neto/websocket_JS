const WebSocket = require('ws');

function getId(){
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });

    wss.on('connection', (ws, req)=>{
        ws.id = getId();
        ws.on('message', data=>{
            // ws.send(`recebido: "${data}"`);
            wss.clients.forEach(function(client) {
                if(client.id != ws.id){
                    client.send(data.toString());
                }
             });
        });
        ws.on('error', error=>{
            console.log(`error: ${error}`);
        });
    });

    console.log(`App Web Socket Rodando!`);
    return wss;
}