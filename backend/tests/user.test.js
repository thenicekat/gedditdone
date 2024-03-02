"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const _mockdb_1 = require("./_mockdb");
const user_service_1 = require("../src/service/user.service");
const user_service_2 = require("../src/service/user.service");
(0, globals_1.describe)("Create a new user", () => {
    it("should create a new user", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email@email.com",
            phoneNumber: "9999999999",
            karmaPoints: 0
        };
        _mockdb_1.prismaMock.user.create.mockResolvedValue(user);
        (0, globals_1.expect)((0, user_service_1.newUser)(user)).resolves.toEqual({
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
            karmaPoints: 0
        };
        _mockdb_1.prismaMock.user.create.mockResolvedValue(user);
        (0, globals_1.expect)((0, user_service_1.newUser)(user)).resolves.toEqual({
            error: true,
            data: "Email is required to create profile."
        });
    });
    it("should return an error if name is not given", () => {
        const user = {
            id: "1",
            name: "",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0
        };
        _mockdb_1.prismaMock.user.create.mockResolvedValue(user);
        (0, globals_1.expect)((0, user_service_1.newUser)(user)).resolves.toEqual({
            error: true,
            data: "User name is required to create profile."
        });
    });
    it("should return an error if phone number is not given", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "",
            karmaPoints: 0
        };
        _mockdb_1.prismaMock.user.create.mockResolvedValue(user);
        (0, globals_1.expect)((0, user_service_1.newUser)(user)).resolves.toEqual({
            error: true,
            data: "Phone Number is required to create profile."
        });
    });
    it("should check if user already exists", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0
        };
        _mockdb_1.prismaMock.user.create.mockRejectedValue(new Error("User already exists."));
        (0, globals_1.expect)((0, user_service_1.newUser)(user)).resolves.toEqual({
            error: true,
            data: null
        });
    });
});
(0, globals_1.describe)("Update user profile", () => {
    it("should return an error if name is not given", () => {
        const user = {
            id: "1",
            name: "",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0
        };
        (0, globals_1.expect)((0, user_service_2.updateUser)(user)).resolves.toEqual({
            error: true,
            data: "Name and Phone Number are required to update the profile."
        });
    });
    it("should return an error if name is not given", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "",
            karmaPoints: 0
        };
        (0, globals_1.expect)((0, user_service_2.updateUser)(user)).resolves.toEqual({
            error: true,
            data: "Name and Phone Number are required to update the profile."
        });
    });
    it("should update user name and phone successfully", () => {
        const user = {
            id: "1",
            name: "NewName",
            email: "email",
            phoneNumber: "newPhoneNumber",
            karmaPoints: 0
        };
        _mockdb_1.prismaMock.user.findUnique.mockResolvedValue({
            id: "1",
            name: "OldName",
            email: "email",
            phoneNumber: "oldPhoneNumber",
            karmaPoints: 0
        });
        _mockdb_1.prismaMock.user.update.mockResolvedValue(user);
        (0, globals_1.expect)((0, user_service_2.updateUser)(user)).resolves.toEqual({
            error: false,
            data: user
        });
    });
});
(0, globals_1.describe)("Fetch user data", () => {
    it("should fetch user data", () => {
        const user = {
            id: "1",
            name: "name",
            email: "email",
            phoneNumber: "phoneNumber",
            karmaPoints: 0
        };
        _mockdb_1.prismaMock.user.findUnique.mockResolvedValue(user);
        (0, globals_1.expect)((0, user_service_1.getUserByEmail)(user.email)).resolves.toEqual({
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
            karmaPoints: 0
        };
        _mockdb_1.prismaMock.user.findUnique.mockResolvedValue(null);
        (0, globals_1.expect)((0, user_service_1.getUserByEmail)(user.email)).resolves.toEqual({
            error: true,
            data: "User does not exist."
        });
    });
});
