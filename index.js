const app = require('./app');
const appWs = require('./app-ws');
 
const server = app.listen(80, () => {
    console.log(`App Rodando!`);
})
 
appWs(server);