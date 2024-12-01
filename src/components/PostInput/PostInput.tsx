import { ChangeEvent } from "react";

interface Props {
    labelText: string;
    inputId: string;
    inputValue: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    testId?: string;
}

export const PostInput = ({ labelText, inputId, inputValue, testId, onChange}: Props) => {

    return (
        <div data-testid={testId}>
            <label htmlFor={inputId ? inputId : ""}>{labelText}</label>
            <input 
                type="text"
                name={inputId}
                id={inputId}
                value={inputValue} 
                // placeholder={inputValue}
                onChange={onChange} 
            />
        </div>
    )
}