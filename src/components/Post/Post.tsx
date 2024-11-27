/*+++ Post.tsx*/

import "./Post.css"

interface Props {
    name: string;
    message: string;
}

export const Post = ({ name, message }: Props) => {

    return (
        <div className="post">
            <p>{name}</p>
            <p>{message}</p>
        </div>
    )
}