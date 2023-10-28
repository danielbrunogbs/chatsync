import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

function Chat({socket, username, avatar, oldMessages}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [showEmoji, setShowEmoji] = useState(false);
    const [restChars, setRestChars] = useState(280);
    
    const toggleEmoji = () => {
        let now = showEmoji;
        setShowEmoji(!now);
    };

    const resetRestChars = () => {
        setRestChars(280);
    }

    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                author: username,
                image: avatar,
                message: currentMessage,
                type: "message",
                time: Date.now()
            }
        
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
            resetRestChars();
        }
    };
    
    const addEmoji = (event) => {
        let emoji = event.native;
        setCurrentMessage(currentMessage + emoji);
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>ChatSync</p>
            </div>
            <div className="chat-body">
            <ScrollToBottom className="message-container">
                {oldMessages.map((messageContent) => {
                    return <div className="message" id={"other"}>
                        <div>
                            <div className="message-meta"> 
                                <p id="author">{messageContent.author}</p> 
                            </div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                        </div>
                    </div>
                })}
                {messageList.map((messageContent) => {
                    return messageContent.type === "message" ? (
                        <div className="message" id={username === messageContent.author ? "you" : "other"}>
                        <div>
                            <div className="message-meta"> 
                                <p id="author">{messageContent.author}</p> 
                            </div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="message-event">
                            <p>{messageContent.author + " " + messageContent.message}</p>
                        </div>
                    )
                })}
            </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <button onClick={toggleEmoji}>{String.fromCodePoint(0x1f60a)}</button>
                <div className="inputMessage">
                    <input type="text" 
                    placeholder="Mensagem..."
                    maxLength="280"
                    value={currentMessage}
                    onChange = {
                        (event) => {
                            setRestChars(280 - event.target.value.length);
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter"){ 
                                sendMessage();
                            }
                        }}
                    />
                </div>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
                {showEmoji ? (
                <div className="emoji-pannel">
                    <Picker
                    onSelect={addEmoji}
                    emojiTooltip={true}
                    title="ChatSync"
                    emoji=":postbox:"
                    set="apple"
                    />
                </div>
            ) : (
            <p>
            </p>
            )}
            <p className="limit-chars">{"Caract. Restantes: " + restChars}</p>
        </div>
    )
}

export default Chat;