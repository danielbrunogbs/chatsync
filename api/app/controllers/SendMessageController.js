const { Message } = require("../models");

module.exports = async function SendMessageController(socket, data)
{
    var message = await Message.create({
        author: data.author,
        avatar: data.image,
        message: data.message
    });

    socket.to(1).emit("receive_message", message);
}