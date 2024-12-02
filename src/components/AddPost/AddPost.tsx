import { useDispatch } from "react-redux";
import { v4 as uuId } from "uuid";
import { ADD_POST } from "../../redux/reducers/posts/postListSlice";
import { FormEvent, useEffect, useRef } from "react";
import { PostInput } from "../PostInput/PostInput";

interface Props {
    testId?: string
    subTestId?: string;
}

export const AddPost = ({ testId, subTestId }: Props) => {
    
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const messageInputRef = useRef<HTMLInputElement | null>(null);
    const counterRerenders = useRef<number>(0);


    useEffect(() => {
        counterRerenders.current++;
    });

    const dispatch = useDispatch();

    const handleAddPost = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!nameInputRef.current || !messageInputRef.current) return;

        const enteredName = nameInputRef.current.value;
        const enteredMessage = messageInputRef.current.value;


        if (!validateForm(enteredName, enteredMessage)) return;

        dispatch(
            ADD_POST({ name: enteredName, message: enteredMessage, postId: uuId()})
        );

        nameInputRef.current.value = "";
        messageInputRef.current.value = "";
    }   

    const validateForm = (name: string, message: string) => {
        if (name.length > 0 && message.length > 0)
            return true;
        return false;
    }

    return (
        <div data-testid={testId}>
            <h1>Renders: {counterRerenders.current}</h1>
            <form onSubmit={handleAddPost}>
                <PostInput
                labelText="Nombre"
                inputId="name"
                testId={subTestId}
                ref={nameInputRef}
                 />
                <PostInput
                labelText="Mensaje"
                inputId="message"
                ref={messageInputRef}
                testId={subTestId}
                 />
                <button type="submit">
                    Añadir post
                </button>
            </form>
        </div>
    )
}
