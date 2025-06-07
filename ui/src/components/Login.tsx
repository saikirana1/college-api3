// login.jsx
import { useState } from "react"
import axios from "axios"

function Login() {
  const [form, setForm] = useState({ username: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/auth/login", form, { withCredentials: true })
    alert("Logged in!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
