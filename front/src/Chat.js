import React, { useEffect, useState } from "react";

function Chat({socket, username, avatar}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    
    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                author: username,
                image: avatar,
                message: currentMessage,
                time: Date.now()
            }
        
            await socket.emit("send_message", messageData);
        }
    };
    
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data])
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>ChatSync</p>
            </div>
            <div className="chat-body">
                {messageList.map((messageContent) => {
                    return <h1>{messageContent.message}</h1>
                })}
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="Hey..."
                onChange = {
                    (event) => {
                        setCurrentMessage(event.target.value)
                    }
                }/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat;