import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event";
import { PostInput } from "./PostInput";

describe("PostInput component", () => {
    
    it("should render with provider props valid, them check the label text is correcly", () => {
        
        const props = { text: 'My Label', name: "name", value: 'Hello World!', onChange: () => {} };
        
        render(<PostInput  {...props} />);

        const htmlLabel = screen.getByText(props.text);


        expect(htmlLabel.textContent).toBe(props.text);        
    })

    it("should render with provider props with empty string name, then render label has a for attribute equal to an empty string", () => {
        
        const props = { text: 'My Label', name: "", value: 'default', onChange: () => {} };
        
        render(<PostInput  {...props} />);

        const htmlLabel = screen.queryByLabelText(props.text)

        expect(htmlLabel).toBeNull();        
    })


    it("should render with provider props with empty string name, then render input has a name attribute equal to an empty string", () => {
        
        const props = { text: 'My Label', name: "", value: 'default', onChange: () => {} };
        
        render(<PostInput  {...props} />);

        const htmlLabel = screen.getByRole("textbox");

        expect(htmlLabel.getAttribute("name")).toBe("");
    })

    it("should render with provider props with empty string name, then render input has a id attribute equal to an empty string", () => {
        
        const props = { text: 'My Label', name: "", value: 'default', onChange: () => {} };
        
        render(<PostInput  {...props} />);

        const htmlLabel = screen.getByRole("textbox");

        expect(htmlLabel.getAttribute("id")).toBe("");
    })

    it("should render with provider props with empty string name, has a id attribute equal to an empty string", () => {
        
        const props = { text: 'My Label', name: "", value: 'default', onChange: () => {} };
        
        render(<PostInput  {...props} />);

        const htmlLabel = screen.getByRole("textbox");

        expect(htmlLabel.getAttribute("id")).toBe("");
    })

    it("should render with provider props valid, them change input value and check the onChange method called correcly times", async () => {
        
        const onChange = () => {

        }
        
        const props = { text: 'My Label', name: "email", value: 'federico', onChange: onChange };

        const spyOnChange = vi.spyOn(props, "onChange");
        
        render(<PostInput  {...props} />);

        const htmlInput = screen.getByRole("textbox");

        await userEvent.type(htmlInput, 'hellos')

        expect(spyOnChange).toBeCalledTimes(6)
    })
})
