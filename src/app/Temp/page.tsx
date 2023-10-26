"use client"
import Image from 'next/image'
import Learnlink from './Untitled_Artwork 5.png'
import {Button} from "../components/ui/button";
import Link from "next/link";
import axios from "axios";
import {useEffect} from "react";
import {promises} from "dns";
import {User} from "../types";
import {Tag} from "../types";
import {Post} from "../types";

export default function Home() {
    useEffect( () => {
        async function getUser() {
            // const user = await data()
            // if (user) {
            //     console.log(user)
            // }
            // else {
            //     console.log("where is the user")
            // }

            const userNoType = await dataNoType()
            if (userNoType) {
                console.log(userNoType)
            }
            else {
                console.log("where is the user")
            }
        }
        getUser()
    }, [])
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

async function data() : Promise<Post[]|null> {

    try {
        const response = await axios.get("http://localhost:8800/api/users/username/gabe")
        return response.data
    }
    catch (e) {
        console.error(e);
        return null;
    }


}

async function dataNoType() : Promise<Post[]|null>{

    try {
        const response = await axios.get("http://localhost:8800/api/posts/all/posts")
        return response.data
    }
    catch (e) {
        console.error(e);
        return null;
    }


}
 
