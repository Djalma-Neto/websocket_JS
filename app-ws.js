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
            let menssage = JSON.parse(data)

            if(menssage.type == 'SETPARAMETERS'){
                wss.clients.forEach(function(client) {
                    if(client.id == ws.id){
                        ws.empresa = menssage.empresa;
                        ws.unidade = menssage.unidade;
                    }
                 });
            }else{
                wss.clients.forEach(function(client) {
                    if(client.id != ws.id && client.unidade == ws.unidade){
                        client.send(JSON.stringify(menssage));
                    }
                 });
            }
        });
        ws.on('error', error=>{
            console.log(`error: ${error}`);
        });
    });

    console.log(`App Web Socket Rodando!`);
    return wss;
}