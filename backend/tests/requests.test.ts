import { describe } from "@jest/globals";
import { prismaMock } from "./_mockdb";
import { createRequest, getMyRequests, getRequestsForPost } from "../src/service/requests.service";
import { Request } from ".prisma/client";
import { Post, User } from "@prisma/client";

const user: User = {
    id: "1",
    name: "ben",
    email: "ben@ben.com",
    phoneNumber: "1234567890",
    karmaPoints: 10,
}

const request: Request = {
    id: "1",
    postId: "1",
    senderEmail: "ben@ben.com",
    status: "open",
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

describe("Retreive my requests", () => {
    it("should get all requests of a user", () => {
        prismaMock.request.findMany.mockResolvedValue([request]);

        expect(getMyRequests(request.senderEmail)).resolves.toEqual({
            error: false,
            data: [request]
        });
    })

    it("should return an empty array if user does not exist", () => {
        prismaMock.request.findMany.mockResolvedValue([]);

        expect(getMyRequests("")).resolves.toEqual({
            error: true,
            data: []
        });
    })
});

describe("Get requests for a post", () => {
    it("should get all requests of a post", () => {
        prismaMock.request.findMany.mockResolvedValue([request]);

        expect(getRequestsForPost(post.id)).resolves.toEqual({
            error: false,
            data: [request]
        });
    })
})

describe("Create a new request", () => {
    it("should throw an error if you are trying to request on your own post", () => {
        prismaMock.post.findFirst.mockResolvedValue(post);
        prismaMock.user.findFirst.mockResolvedValue(user);
        prismaMock.request.create.mockResolvedValue(request);

        expect(createRequest(post.id, request.senderEmail)).resolves.toEqual({
            error: true,
            data: 'You cannot on request your own post.'
        });
    })

    it("should throw an error if a request already exists", () => {
        prismaMock.request.findFirst.mockResolvedValue(request);

        expect(createRequest(post.id, request.senderEmail)).resolves.toEqual({
            error: true,
            data: "You have already sent a request for this post."
        });
    })

    it("should throw an error if the psot does not exist", () => {
        prismaMock.post.findFirst.mockResolvedValue(null);

        expect(createRequest(post.id, request.senderEmail)).resolves.toEqual({
            error: true,
            data: "Post does not exist."
        });
    })

    it("should throw an error if the user does not exist", () => {
        prismaMock.post.findFirst.mockResolvedValue(post);
        prismaMock.user.findFirst.mockResolvedValue(null);

        expect(createRequest(post.id, request.senderEmail)).resolves.toEqual({
            error: true,
            data: "User does not exist."
        });
    })

    it("should create a new request", () => {
        let newPost = post;
        newPost.authorId = "2";
        prismaMock.post.findFirst.mockResolvedValue(post);
        prismaMock.user.findFirst.mockResolvedValue(user);
        prismaMock.request.create.mockResolvedValue(request);

        expect(createRequest(post.id, request.senderEmail)).resolves.toEqual({
            error: false,
            data: request
        });
    })

    it("should catch any error occurred", () => {
        post.authorId = "2";

        prismaMock.post.findFirst.mockRejectedValue(new Error("Some error occurred"));

        expect(createRequest(post.id, request.senderEmail)).resolves.toEqual({
            error: true,
            data: "An error occurred while creating the request. Please try again later."
        });

        post.authorId = "1";
    })
});