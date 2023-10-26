export interface User {
    _id: string,
    username: string,
    email: string,
    password: string,
    profilePicture: string,
    followingTags: Tag[],
    isAdmin: boolean,
    createdAt: string,
    __v: number,
    bio: string
}

export interface Tag {
    _id: string,
    tagName: string,
    followers: [],
    profilePicture: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface Post {
    _id: string,
    userId: string,
    content: string,
    image: string,
    likes: []
    tags: string[]
    createdAt: string,
    updatedAt: string,
    __v: number,
    bio: string
}