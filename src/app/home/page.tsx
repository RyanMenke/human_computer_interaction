import Image from 'next/image'
import {Button} from "../components/ui/button";
import Link from "next/link";
import {Separator} from "../components/ui/separator";
import {Avatar, AvatarFallback, AvatarImage} from "../components/ui/avatar";
import Learnlink from './tree.jpeg'

export default function Home() {
    return (
        <main className="flex h-screen w-screen flex-col bg-background">
            <div className="flex w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-500"/>
            <div className="flex flex-row grow">
                <SideBar/>
                <Separator orientation="vertical"></Separator>
                <div className="flex grow flex-col h-full items-center border-white">
                    <PostRectangle/>
                    <PostRectangle/>
                </div>
            </div>
        </main>
    )
}

function PostRectangle() {
    return (
        <div className="flex flex-row mt-4 w-[95%] h-16 border items-center p-4">
            <Image src={Learnlink} className="w-12 h-12 rounded-md" alt="@shadcn"/>
            <Separator className="m-4" orientation="vertical"></Separator>
            <span>This is a post Title</span>
        </div>
    )
}

function SideBar() {
    return (
        <div className="flex flex-col items-center w-64 h-full">
            <Avatar className="m-4">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}
