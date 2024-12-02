import { forwardRef, Ref } from "react";

interface Props {
    labelText: string;
    inputId: string;
    testId?: string;
}

export const PostInput = forwardRef(({ labelText, inputId,  testId = "" }: Props, ref: Ref<HTMLInputElement> ) => {

    return (
        <div data-testid={testId}>
            <label htmlFor={inputId}>{labelText}</label>
            <input 
                type="text"
                name={inputId}
                id={inputId}
                ref={ref}
                required
            />
        </div>
    );
});