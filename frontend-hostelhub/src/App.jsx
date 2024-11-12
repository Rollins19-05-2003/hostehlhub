import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RoomPreferenceForm from './RoomPreferenceForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RoomPreferenceForm/>
    </>
  )
}

export default App
