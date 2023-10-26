"use client"
import * as React from "react"

import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"
import Link from "next/link";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useToast} from "../components/ui/use-toast";

export default function CardWithForm() {
    const {toast} = useToast()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const navigateToHome = () => {
        router.push('/home');
    };
    const navigateToTemp = () => {
        router.push('/Temp');
    };

    return (
        <main className="flex h-screen w-screen flex-col items-center bg-background">
            <div className="flex w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-500"/>
            <h1 className="text-6xl font-bold p-[5%] text-gray-100">Learn Link</h1>
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Email</Label>
                            <Input id="name" placeholder="Enter Username"
                                   value={username} onChange={(event) => {setUsername(event.target.value); console.log(username)}}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Password</Label>
                            <Input type="password" id="name" placeholder="Create password"
                                   value={password} onChange={(event) => {setPassword(event.target.value); console.log(password)}}/>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={()=> {
                    navigateToTemp();
                }} variant="outline">Back</Button>
                <Button onClick={async () => {
                    console.log("function entered")
                    const userExists = await checkUser(username)
                    if (userExists) {
                        console.log("user already exists")
                        toast({
                            title: "Looks like a user with that name already exists.",
                            description: "Try signing in."
                        })
                        return
                    }
                    if (username.length > 0 && password.length > 0) {
                        toast({
                            title: "Account Successfully created!",
                            description: "Welcome to a world of learning!"
                        })
                        createUser(username, password);
                        navigateToHome();
                    }
                }}>Submit
                </Button>
            </CardFooter>
        </Card>
        </main>
    )
}

async function checkUser(username) {
    try {
        console.log(username)
        const response = await axios.get("http://localhost:8800/api/users/find/one/" + username)
        return response.data
    }
    catch (e) {
        console.error(e);
        return null;
    }
}

async function createUser(username, password) {
    try {
        const response = await axios.put("http://localhost:8800/api/users/create/user/"+username+"/"+password);
        return response.data
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
