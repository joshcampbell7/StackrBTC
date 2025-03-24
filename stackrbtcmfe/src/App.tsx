import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Login from "./authentication/login"
import Home from "./Home"
import Register from "./authentication/register"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
