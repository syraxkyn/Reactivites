import { makeAutoObservable, runInAction } from "mobx";
import { Post, PostFormValues } from "../models/post";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns'
import { store } from "./store";
import { Profile } from "../models/profile";

export default class PostStore {
    postRegistry = new Map<string, Post>();
    selectedPost: Post | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get postsByDate() {
        return Array.from(this.postRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime()
        );
    }

    get groupedPosts() {
        return Object.entries(
            this.postsByDate.reduce((posts, post) => {
                const date = format(post.date!, 'dd MMM yyyy')
                posts[date] = posts[date] ? [...posts[date], post] : [post];
                return posts;
            }, {} as { [key: string]: Post[] })
        )
    }

    loadPosts = async () => {
        this.setLoadingInitial(true);
        try {
            const posts = await agent.Posts.list();
            console.log(posts)
            posts.forEach(post => {
                this.setPost(post)
            })
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPost = async (id: string) => {
        let post = this.getPost(id);
        if (post) {
            this.selectedPost = post
            return post;
        }
        else {
            this.setLoadingInitial(true);
            try {
                post = await agent.Posts.details(id);
                this.setPost(post);
                runInAction(() => {
                    this.selectedPost = post;
                })
                this.setLoadingInitial(false);
                return post;
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }

    private setPost = (post: Post) => {
        const user = store.userStore.user;
        if (user) {
            post.isHost = post.hostUsername === user.username;
            // post.host = activity.attendees?.find(x => x.username === post.hostUsername);
        }
        post.hostUsername = post.author.displayName;
        post.date = new Date(post.date!);
        this.postRegistry.set(post.id, post);
    }

    private getPost = (id: string) => {
        return this.postRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPost = async (post: PostFormValues) => {
        const user = store.userStore.user;
        try {
            await agent.Posts.create(post);
            const newPost = new Post(post);
            newPost.hostUsername = user!.username;
            this.setPost(newPost);
            runInAction(() => {
                this.selectedPost = newPost;
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    updatePost = async (post: PostFormValues) => {
        try {
            await agent.Posts.update(post);
            runInAction(() => {
                if (post.id) {
                    const updatedPost = { ...this.getPost(post.id), ...post }
                    this.postRegistry.set(post.id, updatedPost as Post)
                    this.selectedPost = updatedPost as Post;
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    deletePost = async (id: string) => {
        this.loading = true;
        try {
            await agent.Posts.delete(id);
            runInAction(() => {
                this.postRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    clearSelectedPost = () => {
        this.selectedPost = undefined;
    }
}