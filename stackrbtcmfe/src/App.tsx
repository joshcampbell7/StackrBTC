import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Login from "./authentication/login"
import Home from "./Home"
import Register from "./authentication/register"
import Dashboard from "./dashboard/dashboard"
import { Amplify } from "aws-amplify"
import { awsExports } from "./aws-exports"
import Page from "./dashboard/page"


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: awsExports.USER_POOL_ID,
      userPoolClientId: awsExports.USER_POOL_CLIENT_ID,
    }
  }
});


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Page />} />
      </Routes>
    </Router>
  )
}

export default App
