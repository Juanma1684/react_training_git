/*+++ PostList.tsx*/

import { Post as IPost } from "../../models/post/post";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Post } from "../Post/Post";

import "./PostList.css"

// interface Props {

// }

export const PostList = () => {

    const posts: IPost[] = useSelector((state: RootState) => state.postList.posts);


    return (
        <div className="posts">
            {posts.map(post => (
                <Post 
                    name={post.name} 
                    message={post.message}
                />
            ))}
        </div>
    )
}