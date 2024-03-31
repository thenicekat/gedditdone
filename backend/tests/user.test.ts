import { describe, expect } from "@jest/globals";
import { prismaMock } from "./_mockdb";
import { getUserByEmail, newUser, getUserById } from "../src/service/user.service";
import { updateUser } from "../src/service/user.service";

describe("Create a new user", () => {
    it("should create a new user", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email@email.com",
            phoneNumber: "9999999999",
            karmaPoints: 0,
            isPublic: true,
            role: "user"
        }

        prismaMock.user.create.mockResolvedValue(user);

        expect(newUser(user)).resolves.toEqual({
            error: false,
            data: user
        });
    });

    it("should return an error if email is not given", () => {
        const user = {
            id: "1",
            name: "name",
            email: "",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: true,
            role: "user"
        }

        prismaMock.user.create.mockResolvedValue(user);

        expect(newUser(user)).resolves.toEqual({
            error: true,
            data: "Email is required to create profile."
        });
    })

    it("should return an error if name is not given", () => {
        const user = {
            id: "1",
            name: "",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: true,
            role: "user"
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
            karmaPoints: 0,
            isPublic: true,
            role: "user"
        }

        prismaMock.user.create.mockResolvedValue(user);

        expect(newUser(user)).resolves.toEqual({
            error: true,
            data: "Phone Number is required to create profile."
        });
    })

    it("should check if user already exists", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: true
        }

        prismaMock.user.create.mockRejectedValue(new Error("User already exists."));
        expect(newUser(user)).resolves.toEqual({
            error: true,
            data: null
        });
    })
});

describe("Update user profile", () => {
    it("should return an error if name is not given", () => {
        const user = {
            id: "1",
            name: "",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: true
        };

        expect(updateUser(user)).resolves.toEqual({
            error: true,
            data: "Name and Phone Number and Public Status are required to update the profile."
        });
    });

    it("should return an error if name is not given", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "",
            karmaPoints: 0,
            isPublic: true
        };

        expect(updateUser(user)).resolves.toEqual({
            error: true,
            data: "Name and Phone Number and Public Status are required to update the profile."
        });
    });

    it("should update user name and phone successfully", () => {
        const user = {
            id: "1",
            name: "NewName",
            email: "email",
            phoneNumber: "newPhoneNumber",
            karmaPoints: 0,
            isPublic: true,
            role: "user"
        };

        prismaMock.user.findUnique.mockResolvedValue({
            id: "1",
            name: "OldName",
            email: "email",
            phoneNumber: "oldPhoneNumber",
            karmaPoints: 0,
            isPublic: true,
            role: "user"
        });

        prismaMock.user.update.mockResolvedValue(user);

        expect(updateUser(user)).resolves.toEqual({
            error: false,
            data: user
        });
    });

    it("should catch any other errors", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: true
        };

        prismaMock.user.findUnique.mockRejectedValue(new Error("Some error"));

        expect(updateUser(user)).resolves.toEqual({
            error: true,
            data: null
        });
    })
});

describe("Fetch user data using email", () => {
    it("should fetch user data", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: true,
            role: "user"
        };

        prismaMock.user.findUnique.mockResolvedValue(user);

        expect(getUserByEmail(user.email)).resolves.toEqual({
            error: false,
            data: user
        });
    });

    it("should return an error if user does not exist", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: true
        };

        prismaMock.user.findUnique.mockResolvedValue(null);

        expect(getUserByEmail(user.email)).resolves.toEqual({
            error: true,
            data: "User does not exist."
        });
    });

    it("should catch any other errors", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: true
        };

        prismaMock.user.findUnique.mockRejectedValue(new Error("Some error"));

        expect(getUserByEmail(user.id)).resolves.toEqual({
            error: true,
            data: null
        });
    })
});

describe("Fetch user data using id", () => {
    it("should fetch user data", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: true,
            role: "user"
        };

        prismaMock.user.findUnique.mockResolvedValue(user);

        expect(getUserById(user.id)).resolves.toEqual({
            error: false,
            data: user
        });
    });

    it("should throw error if user is not public", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: false,
            role: "user"
        };

        prismaMock.user.findUnique.mockResolvedValue(user);

        expect(getUserById(user.id)).resolves.toEqual({
            error: true,
            data: "User is not public."
        });
    })

    it("should catch any other errors", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0,
            isPublic: true
        };

        prismaMock.user.findUnique.mockRejectedValue(new Error("Some error"));

        expect(getUserById(user.id)).resolves.toEqual({
            error: true,
            data: null
        });
    })
})