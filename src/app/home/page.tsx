"use client"
import Image from 'next/image'
import {Button} from "../components/ui/button";
import Link from "next/link";
import {Separator} from "../components/ui/separator";
import {Avatar, AvatarFallback, AvatarImage} from "../components/ui/avatar";
import Learnlink from './tree.jpeg'
import {Label} from "@/app/components/ui/label";
import {Input} from "@/app/components/ui/input";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {User} from "../types";
import {Tag} from "../types";
import {Post} from "../types";
import {CreatePost} from "../components/CreatePost";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea"
import {useToast} from "../components/ui/use-toast";
import {router} from "next/client";
import {useRouter} from "next/navigation";


export default function Home() {
    const [searchText, setSearchText] = useState("");
    const [postText, setPostText] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast()

    async function savePost(content: string) {
        try {
            const response = await axios.put("http://localhost:8800/api/posts/create/post", {
                content
            });
            return response.data
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }

    const navigateToTemp = () => {
        router.push('/Temp');
    };

    async function retrievePosts() {
        try {
            // Perform asynchronous database query or API call here
            const response = await axios.get("http://localhost:8800/api/posts/all/posts")
            const result = await response.data;

            setData(result); // Update the component state with fetched data
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        retrievePosts();
    }, []); // The empty dependency array ensures this effect runs only on component mount


    return (
        <main className="flex h-screen w-screen flex-col bg-background">
            <div className="flex w-full min-h-[3rem] bg-gradient-to-r from-purple-600 to-indigo-500"/>
            <div className="flex flex-row grow">
                <SideBar/>
                <Separator orientation="vertical"></Separator>
                <div className="flex grow flex-col h-full items-center border-white">
                    <div className="flex w-full h-24 items-center p-12">
                        <Forum searchText={searchText} setSearchText={setSearchText}/>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger><button onClick={() => setDialogOpen(true)} className="hover:transition-all ease-in-out hover:text-gray-200 hover:border-solid hover:border-2 border-gray-900 w-36 h-12 ml-8 rounded-lg bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-purple-950 hover:to-indigo-500 duration-300">+ Create Post</button></DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create Post</DialogTitle>
                                    <DialogDescription>
                                        Write the content of your new post here.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex-col items-center">
                                        <Label htmlFor="username" className="mb-8 text-right">
                                            What&#39;s on your mind?
                                        </Label>
                                        <Textarea
                                            id="username"
                                            defaultValue=""
                                            className="col-span-3"
                                            value={postText}
                                            onInput={(event) => setPostText(event.currentTarget.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={() => {
                                        if (postText.trim().length === 0) {
                                            return;
                                        }

                                        savePost(postText).then(() => {
                                            retrievePosts().catch(console.error)
                                            setPostText("")
                                            setDialogOpen(false)
                                            toast({
                                                title: "You did it!",
                                                description: "Your post has been saved and shared with the world"
                                            })
                                        }).catch((e) => {
                                            console.error(e)
                                            toast({
                                                title: "Oops",
                                                description: "There was an error saving your post"
                                            })
                                        })
                                    }} type="submit">Save</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <Separator orientation="horizontal"></Separator>
                    <div className="flex flex-col grow overflow-y-auto w-full">
                        <div className="h-[500px] p-4">
                            <DisplayPosts searchText={searchText} data={data}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

function Forum({searchText, setSearchText}) {
    return (
        <form className="grow">
            <Input id="name" value={searchText} placeholder="Search Posts" onChange={(event) => {setSearchText(event.target.value); console.log(searchText)}} className=""/>
        </form>
    )
}

function DisplayPosts({searchText, data}) {



    console.log(data);
    console.log(data.length);
    const rows = searchText.trim().length > 0 ? data.filter(item =>
        convertToLowerCaseExceptSpecialChars(item.content).match(convertToLowerCaseExceptSpecialChars(searchText))) : data
    //data.map()
    //const a = data.at(0)._id;
    return rows
            .map((item, index) => {
                console.log("code is being run")
                return <PostRectangle key={index} content={item.content}/>
            })
    // return (
    //     <div className="flex-column h-full w-full justify-center">
    //         {data.map((item, index) => {
    //             <PostRectangle key={index} content={item}/>
    //             console.log(item.content)
    //         })}
    //     </div>
    // );
}

// function PostRectangle(content) {
//     const str = JSON.stringify(content)
//     return (
//         <div className="flex flex-row mt-4 w-[95%] h-16 border items-center p-4">
//             <Image src={Learnlink} className="w-12 h-12 rounded-full" alt="@shadcn"/>
//             <Separator className="m-4" orientation="vertical"></Separator>
//             <span>{content.content}</span>
//         </div>
//     )
// }

function convertToLowerCaseExceptSpecialChars(input) {
    return input.replace(/[A-Z]/g, match => match.toLowerCase());
}

function PostRectangle(content) {
    const str = JSON.stringify(content)
    return (
        <div className="flex flex-row mt-4 w-full h-16 border items-center p-4">
            <div >
                <div className="font-bold text-lg flex items-center justify-center bg-gray-500 w-12 h-12 rounded-full" alt="@shadcn">P</div>
            </div>
            <Separator className="m-4" orientation="vertical"></Separator>
            <div className="text-sm items-center flex h-12 w-max-120 overflow-auto">
                <span className="">{content.content}</span>
            </div>
        </div>
    )
}

function SideBar() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center w-32 h-full">
            <Avatar onClick={() => {
                router.push('/Temp');
            }} className="m-7">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Separator orientation="horizontal"></Separator>
        </div>
    )
}

async function getPosts() : Promise<Post[]|null> {

    try {
        const response = await axios.get("http://localhost:8800/api/posts/all/posts")
        return response.data
    }
    catch (e) {
        console.error(e);
        return null;
    }


}

async function createUser(content) {
    try {
        const response = await axios.put("http://localhost:8800/api/posts/create/post", {
            content
        });
        return response.data
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
