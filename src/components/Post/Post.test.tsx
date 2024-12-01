import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react"
import { Post } from "./Post";
import type { Post as IPost } from "../../models/post/post";
import Chance from "chance";

const chance = new Chance();

const generateFakePost = ({ postIdEmpty = false, nameEmpty = false, messageEmpty = false}: {postIdEmpty?: boolean, nameEmpty?: boolean, messageEmpty?: boolean}) => {
    
    const testId = chance.guid();
    
    const postPropsData: IPost = {
        postId: postIdEmpty ? "" : chance.guid(),
        name: nameEmpty ? "" : chance.name(),
        message: messageEmpty ? "" : chance.paragraph(),
    }
    return { postPropsData, testId} ;
}

describe("<Post", () => {

    describe("Rendering", () => {

        describe("With empty string props", () => {
            it ("Verify post exists in the document", async () => {
                const { postPropsData, testId } = generateFakePost({ postIdEmpty: true, nameEmpty: true, messageEmpty: true });

                await render( <Post {...postPropsData} testId={testId} />)
                
                expect(screen.queryByTestId(testId)).toHaveAttribute("data-testid", testId);
            })

            it ("Verify name paragraph exists and has correct text content that is empty string", async () => {
                const { postPropsData, testId } = generateFakePost({ postIdEmpty: true, nameEmpty: true, messageEmpty: true });

                await render( <Post {...postPropsData} testId={testId} />)

                const postElement = screen.getByTestId(testId);
                const nameParagraphElement = postElement.children[0];

                expect(nameParagraphElement).toHaveTextContent("");
            })

            it ("Verify message paragraph exists and has correct text content that is empty string", async () => {
                const { postPropsData, testId } = generateFakePost({ postIdEmpty: true, nameEmpty: true, messageEmpty: true });

                await render( <Post {...postPropsData} testId={testId} />)

                const postElement = screen.getByTestId(testId);
                const messageParagraphElement = postElement.children[1];

                expect(messageParagraphElement).toHaveTextContent("");
            })

            it ("Verify div have id attribute value is empty string", async () => {
                const { postPropsData, testId } = generateFakePost({ postIdEmpty: true, nameEmpty: true, messageEmpty: true });

                await render( <Post {...postPropsData} testId={testId} />)

                const postElement = screen.getByTestId(testId);

                expect(postElement).toHaveAttribute("id", "");
            })
        })

        describe("With random string props (never empty string)", () => {
            it ("Verify post exists in the document", async () => {
                const { postPropsData, testId } = generateFakePost({});
    
                await render( <Post {...postPropsData} testId={testId} />);
    
                expect(screen.queryByTestId(testId)).toHaveAttribute("data-testid", testId);
            })

            it("Verify name paragraph exists and has correct text content matching the expected post name", async () => {
                const { postPropsData, testId } = generateFakePost({});

                await render( <Post {...postPropsData} testId={testId} />);

                const postElement = screen.getByTestId(testId);
                const nameParagraphElement = postElement.children[0];

                expect(nameParagraphElement).toHaveTextContent(postPropsData.name);
            })
            
            it("Verify message paragraph exists and has correct text content matching the expected post message", async () => {
                const { postPropsData, testId } = generateFakePost({});

                await render( <Post {...postPropsData} testId={testId} />);

                const postElement = screen.getByTestId(testId);
                const messageParagraphElement = postElement.children[1];

                expect(messageParagraphElement).toHaveTextContent(postPropsData.message);
            })

            it("Verify div have id attribute value matches the expected postId", async () => {
                const { postPropsData, testId } = generateFakePost({});

                await render( <Post {...postPropsData} testId={testId} />);

                const postElement = screen.getByTestId(testId);

                expect(postElement).toHaveAttribute("id", postPropsData.postId)
            })
        })

  
       
    })

})
