import { beforeEach, describe, expect, it, vi } from "vitest";
import { Post } from "../../models/post/post";
import * as reactRedux from "react-redux";
import { render, screen } from "@testing-library/react";
import { PostList } from "./PostList";
import Chance from "chance";

vi.mock("react-redux", () => {

    const posts: Post[] = [];
    const useSelector = vi.fn(() => posts);

    return {
        ...vi.importActual("react-redux"),
        useSelector,
    }
});

const chance = new Chance();

const setup = () => {
    const spyUseSelector = vi.spyOn(reactRedux, "useSelector");
    return spyUseSelector;
}

const fakePostGenerator = (numberOfElementes: number) => {
    const fakePosts = [];

    for (let x = 0; x < numberOfElementes; x++) {
        const fakePost: Post = {
            postId: chance.guid(),
            name: chance.name(),
            message: chance.paragraph()
        }

        fakePosts.push(fakePost);
    }

    return fakePosts;
}

const verifyPostElementProperties = (post: Element, postsToCompare: Post) => {
    expect(post.getAttribute("id")).toBe(postsToCompare.postId);
    expect(post.children.item(0)?.textContent).toBe(postsToCompare.name);
    expect(post.children.item(1)?.textContent).toBe(postsToCompare.message);
}

const expectPostListToHaveNoPosts = (postList: Element) => {
    expect(postList.children).toHaveLength(0);
}

describe("PostList component tests", () => {

    let customPosts: Post[];
    
 
    beforeEach(() => {
       customPosts = fakePostGenerator(Math.floor(Math.random() * 100) + 1);
    })

    
    it ("When render with useSelector mock with zero posts, then check postList dont have any posts", async () => {
        
        const spyUseSelector = setup();

        spyUseSelector.mockImplementation(() => []);

        await render(<PostList />)

        const postListHtml = screen.getByTestId("post-list");

        expectPostListToHaveNoPosts(postListHtml);
    })

    it ("When render with useSelector mock with one posts, then check postList have only one post", async () => {
        
        const spyUseSelector = setup();

        customPosts = fakePostGenerator(1)

        spyUseSelector.mockImplementation(() => customPosts);

        await render(< PostList />)

        const postListHtml = screen.getByTestId("post-list");

        expectPostListToHaveNoPosts(postListHtml);
    })

    it ("When render with useSelector mock with one posts, then check all parameters from post are correctly", async () => {
        
        const spyUseSelector = setup();

        customPosts = fakePostGenerator(1);

        spyUseSelector.mockImplementation(() => customPosts);

        await render(< PostList />)

        const postListHtml = screen.getByTestId("post-list");

        verifyPostElementProperties(postListHtml.children[0], customPosts[0]);
    })

    describe("When render with custom mock configuration useSelector with generate new random posts", () => {
  
        it("Check posts have name, message and postId correcly value for each Post element", async () => {

            const spyUseSelector = setup();

            spyUseSelector.mockImplementation(() => customPosts);

            await render(<PostList />);
    
            const postListHtml = screen.getByTestId("post-list");
            const childrens = postListHtml.children;

            for (let x = 0; x < childrens.length; x++) {
                verifyPostElementProperties( childrens[x], customPosts[x]);
            }
        })
    })
})