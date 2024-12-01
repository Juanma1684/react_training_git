import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react"
import { Post } from "./Post";
import type { Post as IPost } from "../../models/post/post";
import Chance from "chance";

const chance = new Chance();

const generateFakePost = ({ postIdEmpty = false, nameEmpty = false, messageEmpty = false}: {postIdEmpty?: boolean, nameEmpty?: boolean, messageEmpty?: boolean}) => {
    
    const postDataProps: IPost & { testId: string} = {
        postId: postIdEmpty ? "" : chance.guid(),
        name: nameEmpty ? "" : chance.name(),
        message: messageEmpty ? "" : chance.paragraph(),
        testId: chance.guid()
    }
    return { postDataProps } ;
}

/**
  * Testing utlity function
  * @param testId The id to search element in the screen.
  */
const verifyPostExistInTheDocument = (testId: string) => {
    expect(screen.queryByTestId(testId)).toHaveAttribute("data-testid", testId);
}

/**
  * Testing utlity function
  * @param element The element in document to verify.
  * @param text The text content to element have expect.
  */
const verifyElementToHaveTextContent = (element: Element, text: string) => {
    expect(element).toHaveTextContent(text);
}


describe("<Post", () => {

    describe("Rendering", () => {

        describe("With empty string props", () => {
            it ("Verify post exists in the document", async () => {
                const { postDataProps } = generateFakePost({ postIdEmpty: true, nameEmpty: true, messageEmpty: true });

                await render( <Post {...postDataProps} testId={postDataProps.testId} />)
                
                verifyPostExistInTheDocument(postDataProps.testId);
            })

            it ("Verify name paragraph exists and has correct text content that is empty string", async () => {
               const { postDataProps } = generateFakePost({ postIdEmpty: true, nameEmpty: true, messageEmpty: true });

                await render( <Post {...postDataProps} testId={postDataProps.testId} />)

                const postElement = screen.getByTestId(postDataProps.testId);
                const nameParagraphElement = postElement.children[0];

                verifyElementToHaveTextContent(nameParagraphElement, "");
            })

            it ("Verify message paragraph exists and has correct text content that is empty string", async () => {
               const { postDataProps } = generateFakePost({ postIdEmpty: true, nameEmpty: true, messageEmpty: true });

                await render( <Post {...postDataProps} testId={postDataProps.testId} />)

                const postElement = screen.getByTestId(postDataProps.testId);
                const messageParagraphElement = postElement.children[1];

                verifyElementToHaveTextContent(messageParagraphElement, "")
            })

            it ("Verify div have id attribute value is empty string", async () => {
               const { postDataProps } = generateFakePost({ postIdEmpty: true, nameEmpty: true, messageEmpty: true });

                await render( <Post {...postDataProps} testId={postDataProps.testId} />)

                const postElement = screen.getByTestId(postDataProps.testId);

                expect(postElement).toHaveAttribute("id", "");
            })
        })

        describe("With random string props (never empty string)", () => {
            it ("Verify post exists in the document", async () => {
               const { postDataProps } = generateFakePost({});
    
                await render( <Post {...postDataProps} testId={postDataProps.testId} />);
    
                verifyPostExistInTheDocument(postDataProps.testId)
            })

            it("Verify name paragraph exists and has correct text content matching the expected post name", async () => {
               const { postDataProps } = generateFakePost({});

                await render( <Post {...postDataProps} testId={postDataProps.testId} />);

                const postElement = screen.getByTestId(postDataProps.testId);
                const nameParagraphElement = postElement.children[0];

                verifyElementToHaveTextContent(nameParagraphElement, postDataProps.name);
            })
            
            it("Verify message paragraph exists and has correct text content matching the expected post message", async () => {
               const { postDataProps } = generateFakePost({});

                await render( <Post {...postDataProps} testId={postDataProps.testId} />);

                const postElement = screen.getByTestId(postDataProps.testId);
                const messageParagraphElement = postElement.children[1];

                verifyElementToHaveTextContent(messageParagraphElement, postDataProps.message);
            })

            it("Verify div have id attribute value matches the expected postId", async () => {
               const { postDataProps } = generateFakePost({});

                await render( <Post {...postDataProps} testId={postDataProps.testId} />);

                const postElement = screen.getByTestId(postDataProps.testId);

                expect(postElement).toHaveAttribute("id", postDataProps.postId)
            })
        })

  
       
    })

})
