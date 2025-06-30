"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export function DialogDemo({ children }: { children: React.ReactNode }) {
    const [walletName, setWalletName] = useState("")
    const [usernameInput, setUsernameInput] = useState("")
    const [usernames, setUsernames] = useState<string[]>([])

    const addUsername = () => {
        if (usernameInput.trim() && !usernames.includes(usernameInput)) {
            setUsernames([...usernames, usernameInput.trim()])
            setUsernameInput("")
        }
    }

    const emptyUsername = () => {
        setUsernames([])
    }

    const removeUsername = (username: string) => {
        setUsernames(usernames.filter(u => u !== username))
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new wallet</DialogTitle>
                    <DialogDescription>
                        Name your wallet and add the usernames of the people you’ll be saving with! 😊
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="wallet-name">Name</Label>
                        <Input
                            id="wallet-name"
                            value={walletName}
                            onChange={e => setWalletName(e.target.value)}
                            placeholder="e.g. Philippines House 🏠"
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="username">Username</Label>
                        <div className="flex gap-2">
                            <Input
                                id="username"
                                value={usernameInput}
                                onChange={e => setUsernameInput(e.target.value)}
                                placeholder="@username"
                            />
                            <Button type="button" onClick={addUsername}>
                                Add
                            </Button>
                        </div>

                        {/* List of usernames */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {usernames.map((username) => (
                                <Badge key={username} className="flex items-center gap-1">
                                    {username}
                                    <button
                                        type="button"
                                        onClick={() => removeUsername(username)}
                                        className="ml-1 text-xs"
                                    >
                                        ❌
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={emptyUsername} variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={() => console.log(walletName, usernames)}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
