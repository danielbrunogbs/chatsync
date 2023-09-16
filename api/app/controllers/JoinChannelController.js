export default function JoinChannelController(socket, username, sex)
{
    socket.join(1);

    console.log(`${username} (${sex}) entrou no chat.`);

    socket.to(1).emit("enter_chat", username);
}