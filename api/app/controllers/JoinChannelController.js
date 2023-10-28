const { User } = require("../models");

module.exports = async function JoinChannelController(socket, username)
{
    socket.join(1);

    let user = await User.create({
        socket: socket.id,
        author: username
    });

    console.log(`${user.author} entrou no chat.`);

    socket.to(1).emit("receive_message", {
        author: user.author,
        message: "entrou no chat.",
        type: "connect"
    });
}