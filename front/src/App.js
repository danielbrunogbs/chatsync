import './App.css';
import io from 'socket.io-client'
import {useState} from 'react'

const socket = io.connect("localhost:4000")

function App() {
  const [username, setUsername] = useState("")
  const [channel , setChannel ] = useState("")

  const joinChannel = () => {
    if(username !== "" && channel !== ""){
      socket.emit("join_channel", channel)
    }
  };

  return (
    <div className="App">
 
      <h3>ChatSync</h3>
      <input type="text" placeholder="Apelido..." onChange = {
        (event) => {
          setUsername(event.target.value)
        }
      }/>
      <input type="text" placeholder="ID do canal..." onChange = {
        (event) => {
          setChannel(event.target.value)
        }
      }/>
      <button> Entrar no canal</button>
    </div>
  );
}

export default App;
