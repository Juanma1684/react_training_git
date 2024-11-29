import { ChangeEvent } from "react";

interface Props {
    text: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const PostInput = ({ text, name, value, onChange}: Props) => {

    return (
        <div>
            <label htmlFor={name ? name : ""}>{text}</label>
            <input 
                type="text"
                name={name}
                id={name}
                value={value} 
                onChange={onChange} 
            />
        </div>
    )
}


  // const onChange = (event: ChangeEvent<HTMLInputElement>) => {

        // }
        // const spyOnChange = vi.spyOn(props, "onChange");


            // it("should render with provider props valid,  them change input value and check the onChange method with correcly values", async () => {
        
    //     const props = { text: 'My Label', name: "email", value: 'federico', onChange: vi.fn() };
        
    //     render(<PostInput  {...props} />);

    //     const htmlInput = screen.getByRole("textbox");

    //     await userEvent.type(htmlInput, 'hellos')

    //     let valueUseInAllCalls = props.onChange.mock.calls[0][0];

    //     props.onChange.mock.calls.forEach(array => valueUseInAllCalls += array.toString())

    //     expect(valueUseInAllCalls).toHaveBeenCalledWith("hellos");   
    // })


        // it("should render with provider props valid, them change input value and check the onChange method called with correcly args", async () => {
        
       
    //     const onChange = () => {
            
    //     }

        
    //     const props = { text: 'My Label', name: "email", value: 'federico', onChange: onChange() };

    //     const spyOnChange = vi.spyOn(props, "onChange");
        
    //     render(<PostInput  {...props} />);

    //     const htmlInput = screen.getByRole("textbox");

    //     await userEvent.type(htmlInput, 'hellos')

    //     expect(spyOnChange).toBeCalledWith()
    // })