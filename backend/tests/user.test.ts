import { describe, expect } from "@jest/globals";
import { prismaMock } from "./_mockdb";
import { newUser } from "../src/service/user.service";


describe("Create a new user", () => {
    it("should create a new user", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email@email.com",
            phoneNumber: "9999999999",
            karmaPoints: 0
        }

        prismaMock.user.create.mockResolvedValue(user);

        expect(newUser(user)).resolves.toEqual({
            error: false,
            data: user
        });
    });

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

    it("should return an error if phone number is not given", () => {
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
