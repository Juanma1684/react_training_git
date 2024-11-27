import { configureStore  } from "@reduxjs/toolkit";
import postListReducer, { PostListState } from "./reducers/posts/postListSlice";
import { POSTS_DATASET } from "../dataMocks/posts";

interface Store {
    postList: PostListState;
}

const initialStore: Store = {
    postList:  {
          posts: POSTS_DATASET
    },
}

export const store = configureStore({
    reducer: {
        postList: postListReducer,  
    },
    preloadedState: initialStore
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;