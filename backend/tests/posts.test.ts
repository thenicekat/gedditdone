import { describe, expect } from "@jest/globals";
import { prismaMock } from "./_mockdb";
import { createPost, getAllPosts, getMyPosts } from "../src/service/posts.service";
import { Post, User } from ".prisma/client";

const userWith10KarmaPoints: User = {
    id: "1",
    name: "ben",
    email: "ben@ben.com",
    phoneNumber: "1234567890",
    karmaPoints: 10,
}

const userWith0KarmaPoints: User = {
    id: "1",
    name: "ben",
    email: "ben@ben.com",
    phoneNumber: "1234567890",
    karmaPoints: 0,
}

const post: Post & {
    authorEmail: string
} = {
    id: "1",
    authorId: "1",
    authorEmail: "ben@ben.com",
    source: "source",
    destination: "destination",
    costInPoints: 10,
    service: "service",
}

describe("Create a new post", () => {
    it("should create a new post", () => {

        prismaMock.user.findUnique.mockResolvedValue(userWith10KarmaPoints);
        prismaMock.post.create.mockResolvedValue(post);

        expect(createPost(post)).resolves.toEqual({
            error: false,
            data: post
        });
    });

    it("should return an error if mail is not given", () => {
        let originalEmail = post.authorEmail;
        post.authorEmail = "";
        prismaMock.post.create.mockResolvedValue(post);

        expect(createPost(post)).resolves.toEqual({
            error: true,
            data: "Author email is required."
        });
        post.authorEmail = originalEmail;
    })

    it("should return an error if mail is given but user does not exist", () => {
        prismaMock.user.findUnique.mockResolvedValue(null);

        expect(createPost(post)).resolves.toEqual({
            error: true,
            data: "User does not exist."
        });
    })

    it("should return an error if user does not have points", () => {
        prismaMock.user.findUnique.mockResolvedValue(userWith0KarmaPoints);
        prismaMock.post.create.mockResolvedValue(post);

        expect(createPost(post)).resolves.toEqual({
            error: true,
            data: "Karma points not enough to create a post."
        });
    })

    it("should catch any error occurred", () => {
        prismaMock.user.findUnique.mockResolvedValue(userWith10KarmaPoints);
        prismaMock.post.create.mockResolvedValue(post);

        prismaMock.post.create.mockRejectedValue(new Error("Some error occurred"));

        expect(createPost(post)).resolves.toEqual({
            error: true,
            data: "Some error occurred while creating the post"
        });
    })
})

describe("Get all posts", () => {
    it("should get all posts", () => {
        prismaMock.post.findMany.mockResolvedValue([post]);

        expect(getAllPosts()).resolves.toEqual({
            error: false,
            data: [post]
        });
    });

    it("should catch any error occurred", () => {
        prismaMock.post.findMany.mockRejectedValue(new Error("Some error occurred"));

        expect(getAllPosts()).resolves.toEqual({
            error: true,
            data: "Some error occurred while fetching the posts"
        });
    });
})

describe("Get my posts", () => {
    it("should get all posts of a user", () => {
        prismaMock.post.findMany.mockResolvedValue([post]);

        expect(getMyPosts(
            post.authorEmail
        )).resolves.toEqual({
            error: false,
            data: [post]
        });
    });

    it("should catch any error occurred", () => {
        prismaMock.post.findMany.mockRejectedValue(new Error("Some error occurred"));

        expect(getMyPosts(
            post.authorEmail
        )).resolves.toEqual({
            error: true,
            data: []
        });
    });
})