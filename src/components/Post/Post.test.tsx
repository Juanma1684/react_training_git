import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react"
import { Post } from "./Post";
import type { Post as IPost } from "../../models/post/post";
import Chance from "chance";

const chance = new Chance();

const generateFakePost = () => {
    const post: IPost = {
        postId: chance.guid(),
        name: chance.name(),
        message: chance.paragraph(),
    }
    return post;
}

describe("Post component", () => {
    it("should render name and message props provider", () => {
        
        const post = generateFakePost();

        render(<Post {...post} />);

        const htmlParagraphs = screen.getAllByRole("paragraph");
        const postHtml = screen.getByTestId(post.postId);

        expect(postHtml.getAttribute("id")).toBe(post.postId)
        expect(htmlParagraphs[0].textContent).toBe(post.name);
        expect(htmlParagraphs[1].textContent).toBe(post.message);
    })
})
