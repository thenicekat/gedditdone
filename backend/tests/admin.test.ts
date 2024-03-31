import { describe, expect } from "@jest/globals";
import { prismaMock } from "./_mockdb";
import { User } from ".prisma/client";
import { getAllUsers, promoteUser, demoteUser } from "../src/service/admin.service";

const user: User = {
    id: "1",
    name: "ben",
    email: "ben@ben.com",
    phoneNumber: "9898989898",
    karmaPoints: 0,
    role: "admin",
    isPublic: true
}

const a: User = {
    id: "2",
    name: "ben",
    email: "ben@hen.com",
    phoneNumber: "9898989898",
    karmaPoints: 0,
    role: "admin",
    isPublic: true
}

const na: User = {
    id: "2",
    name: "ben",
    email: "ben@hen.com",
    phoneNumber: "9898989898",
    karmaPoints: 0,
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
        prismaMock.user.findUnique.mockResolvedValue(na);
        prismaMock.user.update.mockResolvedValue(a);

        expect(promoteUser(na.email)).resolves.toEqual({
            error: false,
            data: a
        })
    })

    it("should return error if any error occured", () => {
        prismaMock.user.findUnique.mockResolvedValue(na);
        prismaMock.user.update.mockRejectedValue(new Error("Some error occurred"));

        expect(promoteUser(na.email)).resolves.toEqual({
            error: true,
            data: "Some error occurred while promoting user to admin role"
        })
    })
})

describe("demote admin to user", () => {
    it("should demote admin to user", () => {
        prismaMock.user.findUnique.mockResolvedValue(a);
        prismaMock.user.update.mockResolvedValue(na);

        expect(demoteUser(a.email)).resolves.toEqual({
            error: false,
            data: na
        })
    })

    it("should return error if any error occured", () => {
        prismaMock.user.findUnique.mockResolvedValue(a);
        prismaMock.user.update.mockRejectedValue(new Error("Some error occurred"));

        expect(demoteUser(a.email)).resolves.toEqual({
            error: true,
            data: "Some error occurred while demoting admin to user role"
        })
    })
})