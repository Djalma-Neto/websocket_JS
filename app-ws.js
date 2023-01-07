const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });

    wss.on('connection', (ws, req)=>{
        ws.on('message', data=>{
            // ws.send(`recebido: "${data}"`);
            wss.clients.forEach(function(client) {
                client.send(data.toString());
             });
        });
        ws.on('error', error=>{
            console.log(`error: ${error}`);
        });
    });

    console.log(`App Web Socket Rodando!`);
    return wss;
}