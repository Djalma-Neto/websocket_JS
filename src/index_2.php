<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebSocket EchoServer</title>
</head>
<body>
<label for="input">Digite aqui: </label>
<input id="input" type="text" placeholder="Digite aqui"/>

<div id="response"></div>
<script>
    let input = document.getElementById('input');
    let response = document.getElementById('response');
    const socket = new WebSocket('ws://lamparinasws.herokuapp.com:8000');

    // Ao estabelecer a conexão enviamos uma mensagem pro servidor
    socket.addEventListener('open', function () {
        socket.send('Conexão estabelecida.');
    });
    
    // Callback disparado sempre que o servidor retornar uma mensagem
    socket.addEventListener('message', function (event) {
        response.insertAdjacentHTML('beforeend', "<p><b>Servidor diz: </b>" + event.data + "</p>");
    });

    input.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            socket.send(this.value);
            this.value = '';
        }
    });
</script>
</body>
</html>