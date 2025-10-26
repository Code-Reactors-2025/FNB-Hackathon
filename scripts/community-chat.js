    // ==================== SIDE NAV TOGGLE ====================
document.addEventListener('DOMContentLoaded', () => {
  menuToggle.addEventListener('click', () => {
    sideNav.classList.add('active');
    container.classList.add('sidebar-open');
  });

  const sidebarClose = document.getElementById('sidebarClose');
  if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
      sideNav.classList.remove('active');
      container.classList.remove('sidebar-open');
    });
  }
});


const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('messageInput');
    const messages = document.getElementById('messages');

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
      const text = messageInput.value.trim();
      if (text === '') return;
      
      const msgDiv = document.createElement('div');
      msgDiv.classList.add('message', 'sent');
      msgDiv.textContent = text;
      messages.appendChild(msgDiv);

      messageInput.value = '';
      messages.scrollTop = messages.scrollHeight;

      // Simulate reply
      setTimeout(() => {
        const reply = document.createElement('div');
        reply.classList.add('message', 'received');
        reply.textContent = "Thanks for your message!";
        messages.appendChild(reply);
        messages.scrollTop = messages.scrollHeight;
      }, 1000);
    }

    function openChat(name, avatar) {
      document.getElementById('chatName').textContent = name;
      document.getElementById('chatAvatar').src = avatar;
      messages.innerHTML = `<div class="message received">Welcome to ${name} 👋</div>`;
    }

