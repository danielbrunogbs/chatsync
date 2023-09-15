import './App.css';
import io from 'socket.io-client'
import {useState} from 'react'

const socket = io.connect("localhost:4000")

function App() {

  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("other");

  const channel = 1

  const joinChannel = () => {
    if(username !== ""){
      socket.emit("join_channel", username, selectedAvatar)
    }
  };

  const handleAvatarChange = (event) => {
    setSelectedAvatar(event.target.value);
  };

  return (
    <div className="App">
      <h2>ChatSync</h2>

      <input type="text" placeholder="Apelido..." onChange = {
        (event) => {
          setUsername(event.target.value)
        }
      }/>
      <text> </text>
      <button onClick={joinChannel}>Entrar no canal</button>
      <br/>
      <br/>
      <h2>Escolha seu avatar</h2>
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
    </div>
  );
}

export default App;
