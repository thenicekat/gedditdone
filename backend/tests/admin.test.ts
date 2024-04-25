import { describe, expect } from "@jest/globals";
import { prismaMock } from "./_mockdb";
import { User } from ".prisma/client";
import { getAllUsers, promoteUser, demoteUser, banUser, deltaKarma } from "../src/service/admin.service";

const user: User = {
    id: "1",
    name: "ben",
    email: "ben@ben.com",
    phoneNumber: "9898989898",
    karmaPoints: 0,
    role: "admin",
    isPublic: true
}

const admin: User = {
    id: "2",
    name: "ben",
    email: "ben@hen.com",
    phoneNumber: "9898989898",
    karmaPoints: 0,
    role: "admin",
    isPublic: true
}

const notadmin: User = {
    id: "2",
    name: "ben",
    email: "ben@hen.com",
    phoneNumber: "9898989898",
    karmaPoints: 0,
    role: "user",
    isPublic: true
}

// const na2: User = {
//     id: "3",
//     name: "ben",
//     email: "hen@hen.com",
//     phoneNumber: "9898989898",
//     karmaPoints: 0,
//     role: "user",
//     isPublic: true
// }

const bu: User = {
    id: "2",
    name: "ben",
    email: "ben@hen.com",
    phoneNumber: "9898989898",
    karmaPoints: 0,
    role: "banned",
    isPublic: true
}

const iku: User = {
    id: "2",
    name: "ben",
    email: "ben@hen.com",
    phoneNumber: "9898989898",
    karmaPoints: 12,
    role: "user",
    isPublic: true
}

describe("Get all users", () => {
    it("should get all users", () => {
        prismaMock.user.findMany.mockResolvedValue([user]);

        expect(getAllUsers()).resolves.toEqual({
            error: false,
            data: [user]
        });
    });

    it("should catch any error occurred", () => {
        prismaMock.user.findMany.mockRejectedValue(new Error("Some error occurred"));

        expect(getAllUsers()).resolves.toEqual({
            error: true,
            data: "Some error occurred while fetching the users"
        });
    });
})

describe("promote user to admin", () => {
    it("should promote user to admin role", () => {
        prismaMock.user.findUnique.mockResolvedValue(notadmin);
        prismaMock.user.update.mockResolvedValue(admin);

        expect(promoteUser(notadmin.email)).resolves.toEqual({
            error: false,
            data: admin
        })
    })

    it("should return error if any error occured", () => {
        prismaMock.user.findUnique.mockResolvedValue(notadmin);
        prismaMock.user.update.mockRejectedValue(new Error("Some error occurred"));

        expect(promoteUser(notadmin.email)).resolves.toEqual({
            error: true,
            data: "Some error occurred while promoting user to admin role"
        })
    })
})

describe("demote admin to user", () => {
    it("should demote admin to user", () => {
        prismaMock.user.findUnique.mockResolvedValue(admin);
        prismaMock.user.update.mockResolvedValue(notadmin);


        expect(demoteUser(user.email, admin.email)).resolves.toEqual({
            error: false,
            data: notadmin
        })
    })

    it("should return error if any error occured", () => {
        prismaMock.user.findUnique.mockResolvedValue(admin);
        prismaMock.user.update.mockRejectedValue(new Error("Some error occurred"));


        expect(demoteUser(user.email, admin.email)).resolves.toEqual({
            error: true,
            data: "Some error occurred while demoting admin to user role"
        })
    })
})

describe("ban user", () => {
    it("should ban user", () => {
        prismaMock.user.findUnique.mockResolvedValue(notadmin);
        prismaMock.user.update.mockResolvedValue(bu);

        expect(banUser(notadmin.email)).resolves.toEqual({
            error: false,
            data: bu
        })
    })

    it("should return an error if user does not exist", () => {

        expect(banUser("random@random.com")).resolves.toEqual({
            error: true,
            data: "User does not exist."
        })
    })

    it("should return error if user to be banned is an admin", () => {
        prismaMock.user.findUnique.mockResolvedValue(admin);
        prismaMock.user.update.mockResolvedValue(bu);

        expect(banUser(admin.email)).resolves.toEqual({
            error: true,
            data: "An admin cannot be banned."
        })
    })

    it("should return error if any error occured", () => {
        prismaMock.user.findUnique.mockResolvedValue(notadmin);
        prismaMock.user.update.mockRejectedValue(new Error("Some error occurred"));

        expect(banUser(notadmin.email)).resolves.toEqual({
            error: true,
            data: "Some error occurred while banning user."
        })
    })
})

describe("increase/decrease user karma", () => {
    it("should increase karma", () => {
        prismaMock.user.findUnique.mockResolvedValue(notadmin);
        prismaMock.user.update.mockResolvedValue(iku);

        expect(deltaKarma(notadmin.email, 12, true)).resolves.toEqual({
            error: false,
            data: iku
        })
    })

    it("should decrease karma", () => {
        prismaMock.user.findUnique.mockResolvedValue(iku);
        prismaMock.user.update.mockResolvedValue(notadmin);

        expect(deltaKarma(iku.email, 12, false)).resolves.toEqual({
            error: false,
            data: notadmin
        })
    })

    it("should return error if target karma is negative", () => {
        prismaMock.user.findUnique.mockResolvedValue(notadmin);

        expect(deltaKarma(notadmin.email, 12, false)).resolves.toEqual({
            error: true,
            data: "Stop, Stop! he is already dead."
        })
    })

    it("should return an error if user does not exist", () => {

        expect(banUser("random@random.com")).resolves.toEqual({
            error: true,
            data: "User does not exist."
        })
    })

    it("should return error if user to be updated is an admin", () => {
        prismaMock.user.findUnique.mockResolvedValue(admin);

        expect(deltaKarma(admin.email, 12, true)).resolves.toEqual({
            error: true,
            data: "Admin karma cannot be updated."
        })
    })

    it("should return error if any error occured", () => {
        prismaMock.user.findUnique.mockResolvedValue(notadmin);
        prismaMock.user.update.mockRejectedValue(new Error("Some error occurred"));

        expect(deltaKarma(notadmin.email, 12, true)).resolves.toEqual({
            error: true,
            data: "Some error occurred while changing karma."
        })
    })
})