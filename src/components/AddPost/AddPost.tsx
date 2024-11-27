/*+++ AddPost.tsx*/

import { useDispatch } from "react-redux";
import { ADD_POST } from "../../redux/reducers/posts/postListSlice";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { PostInput } from "../PostInput/PostInput";

export const AddPost = () => {
    
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const handleAddPost = (event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(
            ADD_POST({ name, message })
            
        );
        resetInputs();
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>  {
        //event.isDefaultPrevented();
        setName(event.target.value as string);
    }

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) =>  {
        //event.isDefaultPrevented();
        setMessage(event.target.value as string);
    }

    const resetInputs = () => {
        setName("");
        setMessage("");
    }


    return (
        <div>
            <form onSubmit={handleAddPost}>
                <PostInput
                label="Nombre"
                value={name}
                onChange={handleNameChange}
                 />
                <PostInput
                label="Mensaje"
                value={message}
                onChange={handleMessageChange}
                 />
                <button type="submit">
                    Añadir post
                </button>
            </form>
        </div>
    )
}
