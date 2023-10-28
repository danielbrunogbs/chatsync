const { User } = require("../models");

module.exports = async function DisconnectChannelController(socket)
{
    let user = await User.findOne({ where: { socket: socket.id } });

    if(user === null)
    {
        return;
    }

    console.log(`${user.author} desconectou do chat.`);

    socket.to(1).emit("receive_message", {
        author: user.author,
        message: "desconectou do chat.",
        type: "disconnect"
    });
}