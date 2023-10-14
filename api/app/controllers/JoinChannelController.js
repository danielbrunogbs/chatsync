module.exports = function JoinChannelController(socket, username)
{
    socket.join(1);

    console.log(`${username} entrou no chat.`);

    socket.to(1).emit("enter_chat", username);
}