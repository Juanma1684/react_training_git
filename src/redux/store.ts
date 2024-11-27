import { configureStore  } from "@reduxjs/toolkit";
import postListReducer, { PostListState } from "./reducers/posts/postListSlice";
import { POSTS_DATASET } from "../dataMocks/posts";

interface State {
    postList: PostListState;
}

const initialState: State = {
    postList:  {
          posts: POSTS_DATASET
    },
}

export const store = configureStore({
    reducer: {
        postList: postListReducer,  
    },
    preloadedState: initialState
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;