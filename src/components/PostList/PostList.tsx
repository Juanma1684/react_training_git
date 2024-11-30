import { Post as IPost } from "../../models/post/post";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Post } from "../Post/Post";

import "./PostList.css"

export const PostList = () => {

    const posts: IPost[] = useSelector((state: RootState) => state.postList.posts);

    return (
        <div className="posts" data-testid="post-list">
            {posts.map(post => (
                <Post 
                    postId={post.postId}
                    key={post.postId}
                    name={post.name} 
                    message={post.message}
                />
            ))}
        </div>
    )
}