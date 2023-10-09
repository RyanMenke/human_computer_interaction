import Image from 'next/image'
import Learnlink from './Untitled_Artwork 5.png'
import {Button} from "../components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex h-screen w-screen flex-col items-center bg-background">
            <div className="flex w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-500"/>
            <h1 className="text-6xl font-bold p-[5%] text-gray-100">Learn Link</h1>
            <Image src={Learnlink} className="h-[35%] w-[28%]" alt="Logo"/>
            <Button className="px-24 py-6 m-6" asChild>
                <Link href="/sign-up">Sign up</Link>
            </Button>
            <Button variant="outline" className="px-24 py-6 m-6" asChild>
                <Link href="/sign-in">Sign in</Link>
            </Button>
        </main>
    )
}
 
