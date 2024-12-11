// import { useState } from 'react'
import logo from './assets/logo.png';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <h1>Olá cinéfilo,</h1>
        <h2>que bom te ver por aqui!</h2>

        <div>
          <h3>E-mail</h3>
          <input type="text" placeholder="Insira seu e-mail"/>
          <h3>Senha</h3>
          <input type="text" placeholder="Insira sua senha"/>
        </div>
      </div>
    </>
  )
}

export default App
