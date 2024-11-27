/*+++ postListSlice.ts*/

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../store";
import { Post } from "../../../models/post/post";




export interface PostListState {
    posts: Post[]
}


const initialState: PostListState = {
    posts: [],
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