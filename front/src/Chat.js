import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

function Chat({socket, username, avatar, oldMessages}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [showEmoji, setShowEmoji] = useState(false);
    
    const toggleEmoji = () => {
        let now = showEmoji;
        setShowEmoji(!now);
    };

    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                author: username,
                image: avatar,
                message: currentMessage,
                time: Date.now()
            }
        
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
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
                    return <div className="message" id={username === messageContent.author ? "you" : "other"}>
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
            </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <button onClick={toggleEmoji}>{String.fromCodePoint(0x1f60a)}</button>
                <div className="inputMessage">
                    <input type="text" 
                    placeholder="Hey..."
                    value={currentMessage}
                    onChange = {
                        (event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyDown={(event) => {
                            event.key === "Enter" && sendMessage();
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
        </div>
    )
}

export default Chat;