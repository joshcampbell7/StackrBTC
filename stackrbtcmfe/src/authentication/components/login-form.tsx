"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginResponse {
    validateLogin: {
        success: boolean
        message: string
        error?: string
        statusCode: number
        token?: string
        data?: {
            userId: string
            username: string
            email: string
        }
    }
}

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        const query = `
            mutation ValidateLogin($email: String!, $password: String!) {
                validateLogin(email: $email, password: $password) {
                    success
                    message
                    error
                    statusCode
                    token
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
                    },
                }),
            })

            const result: { data: LoginResponse } = await response.json()

            if (result.data.validateLogin.success) {
                // Login successful
                const { token, data } = result.data.validateLogin

                // Store token (you might want to use a more secure method)
                if (token) {
                    localStorage.setItem("authToken", token)
                }

                // Store user data
                if (data) {
                    localStorage.setItem("userData", JSON.stringify(data))
                }

                console.log("Login successful:", result.data)

                // Redirect or handle successful login
                navigate('/dashboard')

            } else {
                // Login failed
                setError(result.data.validateLogin.message || result.data.validateLogin.message)
            }
        } catch (err) {
            console.error("Login error:", err)
            setError("An unexpected error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
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
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
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
                                {isLoading ? "Signing in..." : "Login"}
                            </Button>
                            <Button variant="outline" className="w-full" type="button">
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}