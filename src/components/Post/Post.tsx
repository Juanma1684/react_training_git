import "./Post.css"

interface Props {
    postId: string;
    name: string;
    message: string;
    testId?: string
}

export const Post = ({ name, message, postId, testId }: Props) => {
    
    return (
        <div className="post" id={postId} data-testid={testId}>
            <p>{name}</p>
            <p>{message}</p>
        </div>
    )
}