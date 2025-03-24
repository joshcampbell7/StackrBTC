import { Button } from "@/components/ui/button"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/login")
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-svh">
            <Button onClick={handleClick}>Go to Login</Button>

        </div>
    )
}

export default Home
