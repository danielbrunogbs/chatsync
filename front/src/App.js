import './App.css';
import io from 'socket.io-client'
import Chat from './Chat.js'
import {useEffect, useState} from 'react'


const socket = io.connect("localhost:4000")

function App() {

  const [oldMessages, setOldMessages] = useState(null);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4000/messages');
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }
        const jsonData = await response.json();
        setOldMessages(jsonData);
        setLoading(false);
        console.log(jsonData);
      } catch (error) {
        console.error('Erro na requisição:', error);
        setLoading(false);
      }
    }
    fetchData(); // Chama a função de busca de dados

  }, []); // A lista de dependências vazia garante que a requisição será feita uma vez após o componente montar.

  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("other");
  const [showChat, setShowChat] = useState(false);

  const channel = 1

  const joinChannel = () => {
    if(username !== ""){
      socket.emit("join_channel", username, selectedAvatar);
      localStorage.setItem("user", username);
      localStorage.setItem("icon", selectedAvatar);
      setShowChat(true);
    }
  };

  const handleAvatarChange = (event) => {
    setSelectedAvatar(event.target.value);
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>ChatSync</h3>
          <input
            type="text"
            placeholder="Apelido..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <div className="container">
          <label className="rad">
            <input type="radio" name="rad1" value="other"
              checked={selectedAvatar === "other"}
              onChange={handleAvatarChange}
            />
            <i/>
            <img className="avatar" src="https://a.imagem.app/bOkpZ1.png" alt="Outro"/>
          </label>
          <label className="rad">
            <input type="radio" name="rad1" value="male"
              checked={selectedAvatar === "male"}
              onChange={handleAvatarChange}
            />
            <i/>
            <img className="avatar" src="https://a.imagem.app/bOzA8W.png" alt="Masculino"/>
          </label>
          <label className="rad">
            <input type="radio" name="rad1" value="female"
              checked={selectedAvatar === "female"}
              onChange={handleAvatarChange}
            />
            <i/>
            <img className="avatar" src="https://a.imagem.app/bOkWxQ.png" alt="Feminino"/>
          </label>
          </div>
          <button onClick={joinChannel}>Entrar no canal</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} avatar={selectedAvatar} oldMessages={oldMessages}/>
      )}
    </div>
  );
}

export default App;
