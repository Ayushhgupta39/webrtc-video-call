import { Route, Routes } from 'react-router-dom'
import './App.css'
import LobbyScreen from './screens/Lobby'
import RoomPage from './screens/Room'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<LobbyScreen />} />
        <Route path="/room/:id" element={<RoomPage />} />
      </Routes>
    </div>
  )
}

export default App
