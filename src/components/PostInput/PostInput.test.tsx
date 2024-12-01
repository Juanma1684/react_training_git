import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event";
import Chance from "chance";
import { PostInput } from "./PostInput";

const chance = new Chance();

const generateFakePostInput = ({ needLabelTextEmpty, needInputIdEmpty, needInputValueEmpty }: 
    {needLabelTextEmpty: boolean, needInputIdEmpty: boolean, needInputValueEmpty: boolean}) => {

    const postInputDataProps = {
        labelText: needLabelTextEmpty ? "" : chance.sentence(),
        inputId: needInputIdEmpty ? "" : chance.name(),
        inputValue: needInputValueEmpty ?  "" : chance.paragraph(),
        testId: chance.guid()
    }

    return postInputDataProps;
}

const setup = ({ needLabelTextEmpty = false, needInputIdEmpty = false, needInputValueEmpty = false }) => {
    const dataTestId = chance.guid();
    const onChange = vi.fn(() => {});
    const onChangeWithProps = vi.fn((event) => {

    })
    
    const postInputDataProps = generateFakePostInput({needLabelTextEmpty, needInputIdEmpty, needInputValueEmpty});

    const postInputEventProps = {
        onChange,
        onChangeWithProps
    }

    return { postInputEventProps, postInputDataProps, dataTestId};
}

describe("<PostInput/>", () => {
    
    describe("Rendering", () => {

        describe("Render with empty string props", () => {

            it("Verifies the label text content value have empty string value", async () => {
                    
                    const { postInputDataProps, postInputEventProps } = setup({ needLabelTextEmpty: true });
    
                    await render(
                        <PostInput  {...postInputDataProps} onChange={postInputEventProps.onChange} />
                    );
    
                    const postInputHtml = screen.getByTestId(postInputDataProps.testId);
                    const labelHtml = postInputHtml.children[0];
    
                    expect(labelHtml.textContent).toBe("");        
            })

            it("Verifies the label for attribute have empty string value", async () => {
            
                const { postInputDataProps, postInputEventProps } = setup({ needInputIdEmpty: true });
    
                await render(
                    <PostInput  {...postInputDataProps} onChange={postInputEventProps.onChange} />
                );
    
                const postInputHtml = screen.getByTestId(postInputDataProps.testId);
                const labelHtml = postInputHtml.children[0];
    
                expect(labelHtml.getAttribute("for")).toBe("");               
            })
    
    
            it("Verifies the input value attribute have empty string value", async () => {
                
                const { postInputDataProps, postInputEventProps } = setup({ needInputValueEmpty: true });
    
                await render(<PostInput  {...postInputDataProps} onChange={postInputEventProps.onChange} />);
    
                const postInputHtml = screen.getByTestId(postInputDataProps.testId);
                const inputHtml = postInputHtml.children[1];
    
                expect(inputHtml.getAttribute("value")).toBe("");        
            })
    
            it("Verifies the input id attribute have empty string value", async () => {
                
                const { postInputDataProps, postInputEventProps } = setup({ needInputIdEmpty: true });
    
                await render(<PostInput  {...postInputDataProps} onChange={postInputEventProps.onChange} />);
    
                const postInputHtml = screen.getByTestId(postInputDataProps.testId);
                const inputHtml = postInputHtml.children[1];
    
                expect(inputHtml.getAttribute("id")).toBe("");        
            })
    
            it("Verifies the input name attribute have empty string value", async () => {
                
                const { postInputDataProps, postInputEventProps } = setup({ needInputIdEmpty: true });
                
                await render(<PostInput  {...postInputDataProps} onChange={postInputEventProps.onChange} />);
    
                const postInputHtml = screen.getByTestId(postInputDataProps.testId);
                const inputHtml = postInputHtml.children[1];
    
                expect(inputHtml.getAttribute("name")).toBe("");
            })
        })

        describe("Render with random string (never empty) props", () => {


            it("Verifies the label display correct label text", async () => {
                const { postInputDataProps, postInputEventProps } = setup({});
    
                await render(<PostInput {...postInputDataProps} onChange={postInputEventProps.onChange} />);
    
                const postInputHtml = screen.getByTestId(postInputDataProps.testId);
                const labelHtml = postInputHtml.children[0];
    
                expect(labelHtml.textContent).toBe(postInputDataProps.labelText)
            })
    
                
            it("Verifies that the label element has an for attribute set to the expected value", async () => {
                const { postInputDataProps, postInputEventProps } = setup({});
        
                await render(<PostInput {...postInputDataProps} onChange={postInputEventProps.onChange} />);
        
                const postInputHtml = screen.getByTestId(postInputDataProps.testId);
                const labelHtml = postInputHtml.children[0];
        
                expect(labelHtml.getAttribute("for")).toBe(postInputDataProps.inputId);
            })
    
            it("Verifies that the input element has an id attribute set to the expected value", async () => {
                const { postInputDataProps, postInputEventProps } = setup({});
        
                await render(<PostInput {...postInputDataProps} onChange={postInputEventProps.onChange} />);
        
                const postInputHtml = screen.getByTestId(postInputDataProps.testId);
                const inputHtml = postInputHtml.children[1];
        
                expect(inputHtml.getAttribute("id")).toBe(postInputDataProps.inputId);
            })
        
            it("Verifies that the input element has an name attribute set to the expected value", async () => {
                const { postInputDataProps, postInputEventProps } = setup({});
        
                await render(<PostInput {...postInputDataProps} onChange={postInputEventProps.onChange} />);
        
                const postInputHtml = screen.getByTestId(postInputDataProps.testId);
                const inputHtml = postInputHtml.children[1];
        
                expect(inputHtml.getAttribute("name")).toBe(postInputDataProps.inputId);
            })
        
            it("Verifies that the input element has an value attribute set to the expected value", async () => {
                const { postInputDataProps, postInputEventProps } = setup({});
        
                await render(<PostInput {...postInputDataProps} onChange={postInputEventProps.onChange} />);
        
                const postInputHtml = screen.getByTestId(postInputDataProps.testId);
                const inputHtml = postInputHtml.children[1];
        
                expect(inputHtml.getAttribute("value")).toBe(postInputDataProps.inputValue);
            })
        })
    })

    describe("Actions", () => {
    
        it("Simulates user typing and verifies onChange is called once per character", async () => {
            const { postInputDataProps, postInputEventProps } = setup({});
    
            await render(<PostInput {...postInputDataProps} onChange={postInputEventProps.onChange} />);
    
            const postInputHtml = screen.getByTestId(postInputDataProps.testId);
            const htmlInput = postInputHtml.children[1];
    
            const fakeDataInput = chance.name();
    
            await userEvent.type(htmlInput, fakeDataInput)
    
            expect(postInputEventProps.onChange).toBeCalledTimes(fakeDataInput.length)
        });
    })
});



        // it("Simulates user typing and verifies onChange is called with expect parameter", async () => {
        //     const { postInputDataProps, postInputEventProps } = setup({ needInputIdEmpty: true, needInputValueEmpty: true, needLabelTextEmpty: true});
            
        //     await render(<PostInput {...postInputDataProps} onChange={postInputEventProps.onChangeWithProps} />);
    
        //     const postInputHtml = screen.getByTestId(postInputDataProps.testId);
        //     const htmlInput = postInputHtml.children[1];
    
        //     // Simulate user typing
        //     const fakeDataInput = "Babas";
        //     await vi.fn(() => {
        //         postInputEventProps.onChangeWithProps({ target: { value: fakeDataInput } });
        //     });
        //     // await userEvent.type(htmlInput, fakeDataInput)
            
        //     expect(postInputEventProps.onChangeWithProps).toHaveBeenCalledWith(expect.objectContaining({ target: { value: "Babas" } }));
        // });