"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const _mockdb_1 = require("./_mockdb");
const posts_service_1 = require("../src/service/posts.service");
const userWith10KarmaPoints = {
    id: "1",
    name: "ben",
    email: "ben@ben.com",
    phoneNumber: "1234567890",
    karmaPoints: 10,
};
const userWith0KarmaPoints = {
    id: "1",
    name: "ben",
    email: "ben@ben.com",
    phoneNumber: "1234567890",
    karmaPoints: 0,
};
const post = {
    id: "1",
    authorId: "1",
    authorEmail: "ben@ben.com",
    source: "source",
    destination: "destination",
    costInPoints: 10,
    service: "service",
};
(0, globals_1.describe)("Create a new post", () => {
    it("should create a new post", () => {
        _mockdb_1.prismaMock.user.findUnique.mockResolvedValue(userWith10KarmaPoints);
        _mockdb_1.prismaMock.post.create.mockResolvedValue(post);
        (0, globals_1.expect)((0, posts_service_1.createPost)(post)).resolves.toEqual({
            error: false,
            data: post
        });
    });
    it("should return an error if mail is not given", () => {
        let originalEmail = post.authorEmail;
        post.authorEmail = "";
        _mockdb_1.prismaMock.post.create.mockResolvedValue(post);
        (0, globals_1.expect)((0, posts_service_1.createPost)(post)).resolves.toEqual({
            error: true,
            data: "Author email is required."
        });
        post.authorEmail = originalEmail;
    });
    it("should return an error if mail is given but user does not exist", () => {
        _mockdb_1.prismaMock.user.findUnique.mockResolvedValue(null);
        (0, globals_1.expect)((0, posts_service_1.createPost)(post)).resolves.toEqual({
            error: true,
            data: "User does not exist."
        });
    });
    it("should return an error if user does not have points", () => {
        _mockdb_1.prismaMock.user.findUnique.mockResolvedValue(userWith0KarmaPoints);
        _mockdb_1.prismaMock.post.create.mockResolvedValue(post);
        (0, globals_1.expect)((0, posts_service_1.createPost)(post)).resolves.toEqual({
            error: true,
            data: "Karma points not enough to create a post."
        });
    });
    it("should catch any error occurred", () => {
        _mockdb_1.prismaMock.user.findUnique.mockResolvedValue(userWith10KarmaPoints);
        _mockdb_1.prismaMock.post.create.mockResolvedValue(post);
        _mockdb_1.prismaMock.post.create.mockRejectedValue(new Error("Some error occurred"));
        (0, globals_1.expect)((0, posts_service_1.createPost)(post)).resolves.toEqual({
            error: true,
            data: "Some error occurred while creating the post"
        });
    });
});
(0, globals_1.describe)("Get all posts", () => {
    it("should get all posts", () => {
        _mockdb_1.prismaMock.post.findMany.mockResolvedValue([post]);
        (0, globals_1.expect)((0, posts_service_1.getAllPosts)()).resolves.toEqual({
            error: false,
            data: [post]
        });
    });
    it("should catch any error occurred", () => {
        _mockdb_1.prismaMock.post.findMany.mockRejectedValue(new Error("Some error occurred"));
        (0, globals_1.expect)((0, posts_service_1.getAllPosts)()).resolves.toEqual({
            error: true,
            data: "Some error occurred while fetching the posts"
        });
    });
});
(0, globals_1.describe)("Get my posts", () => {
    it("should get all posts of a user", () => {
        _mockdb_1.prismaMock.post.findMany.mockResolvedValue([post]);
        (0, globals_1.expect)((0, posts_service_1.getMyPosts)(post.authorEmail)).resolves.toEqual({
            error: false,
            data: [post]
        });
    });
    it("should catch any error occurred", () => {
        _mockdb_1.prismaMock.post.findMany.mockRejectedValue(new Error("Some error occurred"));
        (0, globals_1.expect)((0, posts_service_1.getMyPosts)(post.authorEmail)).resolves.toEqual({
            error: true,
            data: []
        });
    });
});
