import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { Post } from "../../models/post/post";
import * as reactRedux from "react-redux";
import { render, screen } from "@testing-library/react";
import { PostList } from "./PostList";

let initialPost: Post[] = [
    {   
        postId: "3445-xxx4-3445",
        name: "Pedro",
        message: "Estamos todos contigo"
    },
    {
        postId: "3445-xxx4-3445",
        name: "YumiiÑ66",
        message: "Por siempre te ayudare"
    }
];


const resetInitialPost = () => {
    initialPost = [
        {   
            postId: "3445-xxx4-3445",
            name: "Pedro",
            message: "Estamos todos contigo"
        },
        {
            postId: "3445-xxx4-3445",
            name: "YumiiÑ66",
            message: "Por siempre te ayudare"
        }
    ];
}




vi.mock("react-redux", () => {

    const posts: Post[] = [
        {   
            postId: "3445-xxx4-3445",
            name: "Pedro",
            message: "Estamos todos contigo"
        },
        {
            postId: "3445-xxx4-3445",
            name: "YumiiÑ66",
            message: "Por siempre te ayudare"
        }
    ];
    const useSelector = vi.fn(() => posts);

    return {
        ...vi.importActual("react-redux"),
        useSelector,
    }
})

describe("PostList component tests", () => {

    let spyUseSelector = vi.spyOn(reactRedux, "useSelector");

    beforeAll(() => {
        spyUseSelector = vi.spyOn(reactRedux, "useSelector");
    })

    beforeEach(() => {
        spyUseSelector.mockClear();
        resetInitialPost();
    })

    const verifyPostElement = (post: Element, index: number, postsToCompare: Post) => {
        expect(post.getAttribute("id")).toBe(postsToCompare.postId);
        expect(post.children.item(0)?.textContent).toBe(postsToCompare.name);
        expect(post.children.item(1)?.textContent).toBe(postsToCompare.message);
    }


    describe("When render with default mock configuration useSelector with initial posts", () => {

        it ("Check posts only exists", async () => {
            render(< PostList />)

            const postListHtml = screen.getByTestId("post-list");
    
            expect(postListHtml.children).toHaveLength(2);
        })

        it ("Check posts have name, message and postId correcly value for each Post element", async () => {
            render(< PostList />)

            const postListHtml = screen.getByTestId("post-list");
            
            const childrens = postListHtml.children;

            for (let x = 0; x < childrens.length; x++) {
                verifyPostElement( childrens[x], x, initialPost[x]);
            }
        })

        it ("Change post element cero name value to margarite, them we should compared expected failed", async () => {
            render(< PostList />)

            const postListHtml = screen.getByTestId("post-list");
            
            const childrens = postListHtml.children;

            initialPost[0].name = "margarite";

            expect(childrens[0].children.item(0)?.textContent).not.toBe(initialPost[0].name);
        })
    })

    describe("When render with custom mock configuration useSelector with new posts", () => {
        
        it("Check posts have name, message and postId correcly value for each Post element", async () => {

            const customPosts: Post[] = [
                {   
                    postId: "reghre-gfhtrj-jrtjtr",
                    name: "Maaalertety",
                    message: "La jodida perra de su prima"
                },
                {
                    postId: "lacalle-de-tu hermana es particular-",
                    name: "Malasaña",
                    message: "Lo hare lo mejor que pueda y me esforzare al 100%"
                },
                {
                    postId: "000000000000000000000000000dsfdfdgfg",
                    name: "11111111111111113435454",
                    message: "Si tu vieras lo que yo veo harias lo que yo hago"
                },
                {
                    postId: "55553x-334343-x-676kkho8-33",
                    name: "El escocido errante",
                    message: "Si te duele el culo tu sabras lo que has hecho"
                },
                {
                    postId: "ñññ-344f-g3434j-5rh54j-j5454234-5465546",
                    name: "Malculeado",
                    message: "Mamita si tu quieres de lo bueno solo llamame!!!!!!"
                }
            ];
    
            const useSelector = vi.fn(() => customPosts);
    
            spyUseSelector.mockImplementation(useSelector);
    
            render(<PostList />);
    
            const postListHtml = screen.getByTestId("post-list");
                
            const childrens = postListHtml.children;

            for (let x = 0; x < childrens.length; x++) {
                verifyPostElement( childrens[x], x, customPosts[x]);
            }
        })
        

    })

})


// describe("When render with default mock configuration useSelector", () => {

//     it ("Check posts exists", async () => {
//         render(< PostList />)

//         const postListHtml = screen.getByTestId("post-list");

//         expect(postListHtml.children).toHaveLength(2);
//     })

//     it ("Check posts have name and message correcly value", async () => {
//         render(< PostList />)

//         const postListHtml = screen.getByTestId("post-list");
        
//         const childrens = postListHtml.children;

//         for (let x = 0; x < childrens.length; x++) {


//             // Con esto podemos testear que cada elemento Post en la lista de Postlist tiene el name 
//             // y el message correcto en la primera linea cogemos el <p> elemento primero que es el del
//             // name y el la segunda linea hacemos lo mismo pero con el message.
//             expect(childrens.item(x)?.children.item(0)?.textContent).toBe(defaultPost[x].name);
//             expect(childrens.item(x)?.children.item(1)?.textContent).toBe(defaultPost[x].message);
            
//             // Falta poder checkear el postId, pero es mas simple de lo que parece.
//             expect(childrens.item(x)?.getAttribute("id")).toBe(defaultPost[x].postId);
//         }



//         // postListHtml.childNodes.forEach((post => {
//         //     const postValues = post.childNodes.values();
//         //     expect(postValues.next().value).toBe("prueba")
//         // }))

//         // expect(postListHtml.children[0].children[]).toHaveLength(2);
//     })
// })


    // it("When useSelector default mock configuration, them we check posts exists", async () => {

    //     render(< PostList />)

    //     const postListHtml = screen.getbyi("post-list");

    //     expect(postListHtml.children).toHaveLength(2);
    // })