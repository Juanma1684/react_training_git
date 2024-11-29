/*+++ Post.tsx*/

import "./Post.css"

interface Props {
    postId: string;
    name: string;
    message: string;
}

export const Post = ({ name, message, postId }: Props) => {

    return (
        <div className="post" id={postId} data-testid={postId}>
            <p>{name}</p>
            <p>{message}</p>
        </div>
    )
}