var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

var users = [];

io.on('connection', function (socket) {
	console.log('User connected');
	socket.on('setUserName', function (data) {
		if(users.indexOf(data) > -1) {
			socket.emit('userExists', '<p class="bg-primary"> Пользователь ' + 
										'<b>' + data + '<b>' + 
										' уже существует, выбери другое имя!</p>');
		} else {
				users.push(data);
				socket.emit('userSet', {username: data});
		}
	});
	socket.on('message', function (data) {
		io.sockets.emit('newMessage', data);
	})
})

var port = 3000;

http.listen(port, function () {
	console.log('go to localhost: ' + port);
})

/*				var btn1 = document.getElementsByClassName('editMessage')[iMessage];
				var btn2 = document.getElementsByClassName('deleteMessage')[iMessage];
				var div = document.getElementsByClassName('user-message')[iMessage];
				btn1.addEventListener('click', function (){
					if(!div.innerHTML) return;
					div.innerHTML = '<b>' + data.user + '</b>: ' + 'denis';
				
				btn2.addEventListener('click', function (){
						div.innerHTML = '<b>' + data.user + '</b>: ' + 'deleted';
						btn1.textContent = 'reestablish';
					})*/

