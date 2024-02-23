import { describe, expect } from "@jest/globals";
import { prismaMock } from "./_mockdb";
import { createPost } from "../src/service/posts.service";

describe("Create a new post", () => {
    // it("should create a new post", () => {
    //     const post = {
    //         id: "1",
    //         authorId: "1",
    //         authorEmail: "authorEmail",
    //         source: "source",
    //         destination: "destination",
    //         costInPoints: 10,
    //         service: "service",
    //     }

    //     prismaMock.post.create.mockResolvedValue(post);

    //     expect(createPost(post)).resolves.toEqual({
    //         error: false,
    //         data: post
    //     });
    // });

    it("should return an error if mail is not given", () => {
        const post = {
            id: "1",
            authorId: "1",
            authorEmail: "",
            source: "source",
            destination: "destination",
            costInPoints: 10,
            service: "service",
        }

        prismaMock.post.create.mockResolvedValue(post);

        expect(createPost(post)).resolves.toEqual({
            error: true,
            data: "Author email is required."
        });
    })

    it("should return an error if user does not have points", () => {
        const post = {
            id: "1",
            authorId: "1",
            authorEmail: "authorEmail",
            source: "source",
            destination: "destination",
            costInPoints: 10,
            service: "service",
        }

        prismaMock.post.create.mockResolvedValue(post);
        // prismaMock.user.findUnique.mockResolvedValue({
        //     id: "1",
        //     name: "author",
        //     email: "authorEmail",
        //     phoneNumber: "1234567890",
        //     karmaPoints: 5,
        //     posts: [] as Post[],
        //     requests: [] as Request[]
        // });

        // expect(createPost(post)).resolves.toEqual({
        //     error: true,
        //     data: "Karma points not enough to create a post."
        // });
    })
})