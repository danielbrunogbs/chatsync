const { Message } = require("../models");

module.exports = async function JoinChannelController(socket, username)
{
    socket.join(1);

    console.log(`${username} entrou no chat.`);

    socket.to(1).emit("enter_chat", username);

    var messages = await Message.findAll();

    socket.to(1).emit("all_messages", messages);
}