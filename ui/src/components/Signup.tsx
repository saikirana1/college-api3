// signup.jsx
import { useState } from "react"
import axios from "axios"

function Signup() {
  const [form, setForm] = useState({ username: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/auth/signup", form, { withCredentials: true })
    alert("Signed up!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default Signup
