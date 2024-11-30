import { Post } from "../models/post/post";
import Chance from "chance"

const chance = new Chance();

export const POSTS_DATASET = [
    {
        postId: chance.guid(),
        name: chance.name(),
        message: chance.paragraph()
    },
    {
        postId: chance.guid(),
        name: chance.name(),
        message: chance.paragraph()
    },
    {
        postId: chance.guid(),
        name: chance.name(),
        message: chance.paragraph()
    },
    {
        postId: chance.guid(),
        name: chance.name(),
        message: chance.paragraph()
    }
] as Post[];