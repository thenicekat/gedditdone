import { describe, expect } from "@jest/globals";
import { prismaMock } from "./_mockdb";
import { createPost, getAllPosts, getMyPosts, getPostDetails, editPost, deletePost, completePost } from "../src/service/posts.service";
import { Post, User, Request } from ".prisma/client";

const userWith10KarmaPoints: User = {
    id: "1",
    name: "ben",
    email: "ben@ben.com",
    phoneNumber: "1234567890",
    karmaPoints: 10,
    isPublic: false,
    role: "user"
}

const userWith0KarmaPoints: User = {
    id: "1",
    name: "ben",
    email: "ben@ben.com",
    phoneNumber: "1234567890",
    karmaPoints: 0,
    isPublic: false,
    role: "user"
}

const bannedUser: User = {
    id: "1",
    name: "ben",
    email: "ben@ben.com",
    phoneNumber: "1234567890",
    karmaPoints: 10,
    isPublic: false,
    role: "banned"
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
    status: "open",
}

// const completedPost: Post & {
//     authorEmail: string
// } = {
//     id: "1",
//     authorId: "1",
//     authorEmail: "ben@ben.com",
//     source: "source",
//     destination: "destination",
//     costInPoints: 10,
//     service: "service",
//     status: "completed",
// }

const request: Request = {
    id: "1",
    postId: "1",
    senderEmail: "tom@ben.com",
    status: "open"
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

    it("should return an error if user is banned", () => {
        prismaMock.user.findUnique.mockResolvedValue(bannedUser);
        prismaMock.post.create.mockResolvedValue(post);

        expect(createPost(post)).resolves.toEqual({
            error: true,
            data: "You have been banned from posting for violating our policies."
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

describe("Get post details", () => {
    it("should get post details successfully", () => {
        prismaMock.post.findUnique.mockResolvedValue(post);

        expect(getPostDetails(
            post.id
        )).resolves.toEqual({
            error: false,
            data: post
        });
    });

    it("should return an error if post does not exist", () => {
        prismaMock.post.findUnique.mockResolvedValue(null);

        expect(getPostDetails(
            post.id
        )).resolves.toEqual({
            error: true,
            data: "Post does not exist."
        });
    });

    it("should catch any error occurred", () => {
        prismaMock.post.findUnique.mockRejectedValue(new Error("Some error occurred"));

        expect(getPostDetails(
            post.id
        )).resolves.toEqual({
            error: true,
            data: null
        });
    });
})

describe("Update post", () => {
    it("should update the post successfully", () => {
        prismaMock.user.findUnique.mockResolvedValue(userWith10KarmaPoints);
        prismaMock.post.update.mockResolvedValue(post);

        expect(editPost({
            id: post.id,
            source: post.source,
            destination: post.destination,
            costInPoints: post.costInPoints,
            service: post.service,
            status: post.status,
            authorEmail: post.authorEmail
        })).resolves.toEqual({
            error: false,
            data: post
        });
    });

    it("should throw an error if user does not exist", () => {
        prismaMock.user.findUnique.mockResolvedValue(null);

        expect(editPost({
            id: post.id,
            source: post.source,
            destination: post.destination,
            costInPoints: post.costInPoints,
            service: post.service,
            status: post.status,
            authorEmail: post.authorEmail
        })).resolves.toEqual({
            error: true,
            data: "User does not exist."
        });
    })

    it("should throw an error if new karma higher than user karma", () => {
        prismaMock.user.findUnique.mockResolvedValue(userWith0KarmaPoints);

        expect(editPost({
            id: post.id,
            source: post.source,
            destination: post.destination,
            costInPoints: post.costInPoints,
            service: post.service,
            status: post.status,
            authorEmail: post.authorEmail
        })).resolves.toEqual({
            error: true,
            data: "Karma points not enough to edit a post."
        });

    })

    it("should throw an error if post has already been closed", () => {
        prismaMock.user.findUnique.mockResolvedValue(userWith10KarmaPoints);

        expect(editPost({
            id: post.id,
            source: post.source,
            destination: post.destination,
            costInPoints: post.costInPoints,
            service: post.service,
            status: "closed",
            authorEmail: post.authorEmail
        })).resolves.toEqual({
            error: true,
            data: "Post has already been closed."
        });

    })

    it("should catch any error occurred", () => {
        prismaMock.user.findUnique.mockRejectedValue(new Error("Some error occurred"));

        expect(editPost({
            id: post.id,
            source: post.source,
            destination: post.destination,
            costInPoints: post.costInPoints,
            service: post.service,
            status: post.status,
            authorEmail: post.authorEmail
        })).resolves.toEqual({
            error: true,
            data: "Some error occurred while updating the post"
        });
    });
})

describe("Complete post", () => {
    it("should throw error if post already completed", () => {
        prismaMock.user.findUnique.mockResolvedValue(userWith0KarmaPoints);
        prismaMock.post.findUnique.mockRejectedValue(new Error("some error occurred"));

        expect(completePost(post.id, userWith0KarmaPoints.email)).resolves.toEqual({
            error: true,
            data: "Some error occurred while completing the post"
        });
    });
})

describe("Delete post", () => {
    it("should throw an error if user does not exist", () => {
        prismaMock.post.findUnique.mockResolvedValue(post);
        expect(deletePost(post)).resolves.toEqual({
            error: true,
            data: "User does not exist."
        });
    });

    it("should throw an error if post has already been closed", () => {
        prismaMock.user.findUnique.mockResolvedValue(userWith10KarmaPoints);
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
            status: "closed",
        }
        prismaMock.post.findUnique.mockResolvedValue(post);
        expect(deletePost(post)).resolves.toEqual({
            error: true,
            data: "Post has already been closed."
        });
    });

    it("should catch any error occurred", () => {
        prismaMock.user.findUnique.mockResolvedValue(userWith10KarmaPoints);
        prismaMock.post.findUnique.mockRejectedValue(new Error("Some Error ocurred"));
        expect(deletePost(post)).resolves.toEqual({
            error: true,
            data: "Some error occurred while deleting the post"
        });
    });

    it("should delete the post successfully", () => {
        prismaMock.user.findUnique.mockResolvedValue(userWith10KarmaPoints);
        prismaMock.$transaction.mockResolvedValue([[request], post]);

        expect(deletePost(post)).resolves.toEqual({
            error: false,
            data: post
        });
    });
})