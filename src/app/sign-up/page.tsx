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

export default function CardWithForm() {
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
                            <Input id="name" placeholder="Enter email address" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Password</Label>
                            <Input type="password" id="name" placeholder="Create password" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={()=> {
                    history.back()
                }} variant="outline">Back</Button>
                <Button asChild>
                    <Link href="/home">Submit</Link>
                </Button>
            </CardFooter>
        </Card>
        </main>
    )
}
