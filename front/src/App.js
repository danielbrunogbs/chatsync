import './App.css';
import io from 'socket.io-client'
import {useState} from 'react'

const socket = io.connect("localhost:4000")

function App() {
  const [username, setUsername] = useState("")
  const channel = 1

  const joinChannel = () => {
    if(username !== ""){
      socket.emit("join_channel", username)
    }
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
      <div class="container">
        <label class="rad">
        <input type="radio" name="rad1" value="a"/>
        <i/><img class="avatar" src="https://a.imagem.app/bOkpZ1.png" alt="Option 1"/>
        </label>
        <label class="rad">
          <input type="radio" name="rad1" value="b" checked/>
          <i/><img class="avatar" src="https://a.imagem.app/bOzA8W.png" alt="Option 2"/>
        </label>
        <label class="rad">
          <input type="radio" name="rad1" value="c" checked/>
          <i/><img class="avatar" src="https://a.imagem.app/bOkWxQ.png" alt="Option 3"/>
        </label>
      </div>
    </div>
  );
}

export default App;
