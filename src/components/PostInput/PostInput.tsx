/*+++ PostInput.tsx*/

import { ChangeEvent } from "react";

interface Props {
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const PostInput = ({ label, value, onChange}: Props) => {
    return (
        <div>
            <label>{label}</label>
            <input 
                name={label.toLowerCase()}
                value={value} 
                onChange={onChange} 
            />
        </div>
    )
}