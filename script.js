let username; // 将 username 声明为全局变量
const onlineUsers = []; // 定义一个全局的在线用户列表

// 添加用户名到用户列表
function addUserToList(username) {
    const userList = document.getElementById('user-list-ul');
    const userItem = document.createElement('li');
    userItem.textContent = username;
    userList.appendChild(userItem);

    // 将用户名添加到全局在线用户列表
    onlineUsers.push(username);
}

// 从用户列表中删除用户名
function removeUserFromList(username) {
    const userList = document.getElementById('user-list-ul');
    const userItems = userList.getElementsByTagName('li');

    // 遍历用户列表，找到要删除的用户名并删除
    for (let i = 0; i < userItems.length; i++) {
        if (userItems[i].textContent === username) {
            userList.removeChild(userItems[i]);
            // 从全局在线用户列表中删除该用户名
            const index = onlineUsers.indexOf(username);
            if (index !== -1) {
                onlineUsers.splice(index, 1);
            }
            break; // 已找到并删除用户名，退出循环
        }
    }
}


document.getElementById('join-button').addEventListener('click', function() {
    const room = document.getElementById('room-input').value;
    username = document.getElementById('username-input').value; // 更新全局变量

    if (room && username) {
        document.getElementById('room-info').textContent = `ROOM：${room}`;
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('chat-container').style.filter = 'none';

        // 添加用户名到用户列表
        addUserToList(username);


        // 在页面关闭前注册 beforeunload 事件
        window.addEventListener('beforeunload', function(event) {
            // 调用函数来删除用户名
            removeUserFromList(username);
        });
        
    } else {
        alert("请填写所有字段");
    }
});

document.getElementById('send-button').addEventListener('click', function() {
    const messageBox = document.getElementById('message-box');
    const input = document.getElementById('message-input');
    const message = input.value;
    const timestamp = new Date().toLocaleString(); // 获取完整的日期和时间

    if (message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<span class="username">${username}</span><span class="timestamp">${timestamp}</span>: ${message}`;
        messageBox.appendChild(messageElement);

        // 清空输入框并滚动到最新消息
        input.value = '';
        messageBox.scrollTop = messageBox.scrollHeight;
    }
});



document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) { 
        document.getElementById('send-button').click();
    }
});




