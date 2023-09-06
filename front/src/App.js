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
      <button onClick={joinChannel}>Entrar no canal</button>
    </div>
  );
}

export default App;
