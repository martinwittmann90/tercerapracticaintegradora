/*--------------CHAT----------------*/
const socket = io();

const messageContainer = document.getElementById('messages');
const btn = document.getElementById('send');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');

btn.addEventListener('click', () => {
  const message = messageInput.value;
  const username = usernameInput.value;
  messageInput.value = '';
  usernameInput.value = '';

  socket.emit('chat_front_to_back', {
    message: message,
    username: username,
  });
});

socket.on('chat_back_to_front', (messages) => {
  messageContainer.innerHTML = messages
    .map((message) => {
      return `<div
       class="notification is-primary is-light"
       style=" text-align: justify; margin-rigth:35px;     padding: 15px;
       border-radius: 20px;">
           <div>
           <p>${message.message}</p>
           </div>
           <div
           style="text-align: end; font-style: italic; font-weight: 400"
           class="has-text-dark"
           >
           ${message.username}
           </div>
       </div>`;
    })
    .join('');
});
