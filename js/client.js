const socket = io('http://localhost:3000');

const form = document.getElementById('sendcontainer');
const messageInput = document.getElementById('messInp');
const messageContainer = document.querySelector(".container");
var audio=new Audio("./ring.mp3");

const append = (message, position) => {
     const messageElement = document.createElement('div');
     messageElement.innerText = message;
     messageElement.classList.add('message');
     messageElement.classList.add(position);
     messageContainer.append(messageElement);
     if(position=='left'){
          audio.play();
     }
}
form.addEventListener('submit', (e) => {
     e.preventDefault();
     const message = messageInput.value;
     append(`You:${message}`, `right`);
     socket.emit('send', message);
     messageInput.value = "";
})

const name1 = prompt("Enter your name to join");
socket.emit('new-user-joined', name1);

socket.on('user-joined', name1 => {
     append(`${name1} joined the chat`, `right`);
});

socket.on('receive', data => {
     append(`${data.name}: ${data.message}`, `left`);
});
socket.on('left', name => {
     append(`${name} left the chat`, `right`);
});