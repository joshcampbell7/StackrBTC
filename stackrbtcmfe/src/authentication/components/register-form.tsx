import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

interface SignupResponse {
    addUser: {
        success: boolean
        message: string
        error?: string
        statusCode: number
        data?: {
            userId: string
            username: string
            email: string
        }
    }
}

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const query = `
      mutation addUser($email: String!, $password: String!, $username: String!) {
        addUser(email: $email, password: $password, username: $username) {
          success
          message
          error
          statusCode
          data {
            userId
            username
            email
          }
        }
      }
    `

        try {
            const response = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        email,
                        password,
                        username,
                    },
                }),
            })

            const result: { data: SignupResponse } = await response.json()
            console.log(result)

            if (result.data.addUser.success) {
                const { data } = result.data.addUser

                if (data) {
                    localStorage.setItem("userData", JSON.stringify(data))
                }

                console.log("Registration successful:", result.data)
                navigate('/dashboard')
            } else {
                setError(result.data.addUser.message || "Registration failed. Try again.")
            }
        } catch (err) {
            console.error("Registration error:", err)
            setError("An unexpected error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Create an account below
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                    {error}
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="yzyfoams"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? "Registering..." : "Submit"}
                            </Button>
                            <Button variant="outline" className="w-full" type="button">
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Have an account already?{" "}
                            <a href="/login" className="underline underline-offset-4">
                                Login
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
