export default function SendMessageController(socket, data)
{
    socket.to(1).emit("receive_message", data);

    console.log(data);
}