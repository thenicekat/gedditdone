import { describe, expect } from "@jest/globals";
import { prismaMock } from "./_mockdb";
import { newUser } from "../src/service/user.service";


describe("Create a new user", () => {
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

    it("should return an error if name is not given", () => {
        const user = {
            id: "1",
            name: "",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0
        }

        prismaMock.user.create.mockResolvedValue(user);

        expect(newUser(user)).resolves.toEqual({
            error: true,
            data: "User name is required to create profile."
        });
    })

    it("should return an error if name is not given", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "",
            karmaPoints: 0
        }

        prismaMock.user.create.mockResolvedValue(user);

        expect(newUser(user)).resolves.toEqual({
            error: true,
            data: "Phone Number is required to create profile."
        });
    })
})
