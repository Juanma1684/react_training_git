import { useDispatch } from "react-redux";
import { ADD_POST } from "../../redux/reducers/posts/postListSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { PostInput } from "../PostInput/PostInput";


export const AddPost = () => {
    
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [btnSubmitDisabled, setBtnSubmitDisabled] = useState(true);
    const dispatch = useDispatch();

    const handleAddPost = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (btnSubmitDisabled) return;

        dispatch(
            ADD_POST({ name, message })
        );
        resetInputs();
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>  {
        
        setName(event.target.value as string);
        updateBtnSubmitDisabled(event.target.value, message)
    }

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) =>  {
        setMessage(event.target.value as string);
        updateBtnSubmitDisabled(name, event.target.value); 
    }

    const resetInputs = () => {
        setName("");
        setMessage("");
    }

    const updateBtnSubmitDisabled = (name: string, message: string) => {
        if (name.length > 0 && message.length > 0)
            setBtnSubmitDisabled(false);
        else 
            setBtnSubmitDisabled(true);
    }


    return (
        <div>
            <form onSubmit={handleAddPost}>
                <PostInput
                text="Nombre"
                name="name"
                value={name}
                onChange={handleNameChange}
                 />
                <PostInput
                text="Mensaje"
                name="message"
                value={message}
                onChange={handleMessageChange}
                 />
                <button type="submit" disabled={btnSubmitDisabled}>
                    Añadir post
                </button>
            </form>
        </div>
    )
}
