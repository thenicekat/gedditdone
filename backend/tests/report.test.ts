import { describe, expect } from "@jest/globals";
import { prismaMock } from "./_mockdb";
import { getAllReports,createReport,closeReport } from "../src/service/report.service";
import {Post , Report} from ".prisma/client"

const validPost: Post = {
    id: "1",
    authorId: "1",
    source: "source",
    destination: "destination",
    costInPoints: 10,
    service: "service",
    status: "open",
}

const completedPost: Post  = {
    id: "1",
    authorId: "1",
    source: "source",
    destination: "destination",
    costInPoints: 10,
    service: "service",
    status: "completed",
}

const report: Report = {
    id: "1",
    reason: "reason",
    status: "open",
    reporterEmail: "abc@abc.com",
    postId: "1"
}


describe("Create a new report", () => {
    it("should create a new report", () => {

        prismaMock.post.findUnique.mockResolvedValue(validPost);
        prismaMock.report.create.mockResolvedValue(report);

        expect(createReport("random","abc@abc.com",validPost.id)).resolves.toEqual({
            error: false,
            data: report
        });
    });

    it("should return an error if reason is not given", () => {
        prismaMock.post.findUnique.mockResolvedValue(validPost);
        prismaMock.report.create.mockResolvedValue(report);
        expect(createReport("","abc@abc.com",validPost.id)).resolves.toEqual({
            error: true,
            data: "Reason is required."
        });
    })

    it("should return an error if mail is not given", () => {
        
        prismaMock.post.findUnique.mockResolvedValue(validPost);
        prismaMock.report.create.mockResolvedValue(report);
        expect(createReport("reason","",validPost.id)).resolves.toEqual({
            error: true,
            data: "Author email is required."
        });
    })


    it("should return an error if post is completed", () => {
        prismaMock.post.findFirst.mockResolvedValue(null);

        expect(createReport("reason","abc@abc.com",completedPost.id)).resolves.toEqual({
            error: true,
            data: "A Report cannot be made against a completed post."
        });
    })

    it("should catch any error occurred", () => {
        prismaMock.post.findUnique.mockResolvedValue(validPost);
        prismaMock.report.create.mockResolvedValue(report);

        prismaMock.post.create.mockRejectedValue(new Error("Some error occurred"));

        expect(createReport("reason", "abc@abc.com", validPost.id)).resolves.toEqual({
            error: true,
            data: "Some error occurred while creating the report."
        });
    })
})

describe("Get all reports", () => {
    it("should get all reports", () => {
        prismaMock.report.findMany.mockResolvedValue([report]);

        expect(getAllReports()).resolves.toEqual({
            error: false,
            data: [report]
        });
    });

    it("should catch any error occurred", () => {
        prismaMock.report.findMany.mockRejectedValue(new Error("Some error occurred"));

        expect(getAllReports()).resolves.toEqual({
            error: true,
            data: "Some error occurred while fetching the reports."
        });
    });
})

describe("Close a report", () => {
    it("should close a report", () => {
        prismaMock.report.findFirst.mockResolvedValue(report);

        report.status = "closed";
        prismaMock.report.update.mockResolvedValue(report);

        expect(closeReport(report.id)).resolves.toEqual({
            error: false,
            data: report
        });

        it("should catch any error occurred", () => {
            prismaMock.report.findFirst.mockResolvedValue(report);
            prismaMock.report.findMany.mockRejectedValue(new Error("Some error occurred"));
    
            expect(closeReport(report.id)).resolves.toEqual({
                error: true,
                data: "Some error occurred while closing the report"
            });
        });
    })


})
