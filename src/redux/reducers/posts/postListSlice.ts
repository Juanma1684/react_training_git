/*+++ postListSlice.ts*/

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../store";
import { Post } from "../../../models/post/post";


const postsDataset = [
    {
        name: "Pedro",
        message: "Felicidades a todos"
    },
    {
        name: "Maria",
        message: "Tengo ganas de ver a mis hijos pablo y rosa"
    },
    {
        name: "Jose",
        message: "Hermanos es hora de perdonar"
    },
    {
        name: "Lala",
        message: "Porque solo yo no tengo pareja joder"
    }
] as Post[];

interface PostListState {
    posts: Post[]
}


const initialState: PostListState = {
    posts: postsDataset,
}


type PostListReducers = {
    ADD_POST: (state: PostListState, action: PayloadAction<Post>) => void;
}


const postListReducers: PostListReducers = {
    ADD_POST: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
    },
}

export const postListSlice = createSlice({
    name: "postList",
    initialState,
    reducers: postListReducers
})

export const { ADD_POST } = postListSlice.actions;

// export const selectPosts = (state: RootState) => state.postList.posts;

export default postListSlice.reducer;