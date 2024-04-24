import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { createReport, getAllReports, closeReport } from "../service/report.service";

export const reportsRouter = Router();

reportsRouter.get('/allreports', async(_, res) => {
    const allReports = await getAllReports();
    if (allReports.error) {
        const response: CustomResponse = {
            error: true,
            message: "Error retrieving reports",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    const response: CustomResponse = {
        error: false,
        message: "All reports retrieved successfully",
        data: allReports.data
    }
    return res.status(HttpCodes.OK).json(response);
})

reportsRouter.post('/create', async(req, res) => {
    const reason = req.body.reason as string;
    const emailId = req.session.email as string;
    const postId = req.body.postId as string;                                                                               

    
    const creRep = await createReport(
        reason,
        emailId,
        postId
    );

    if (creRep.error) {
        const response: CustomResponse = {
            error: true,
            message: creRep.data as string,
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    const response: CustomResponse = {
        error: false,
        message: "Report created successfully",
        data: creRep.data
    }
    return res.status(HttpCodes.CREATED).json(response);

})

reportsRouter.post("/close", async (req, res) => {
    const reportId = req.body.reportId as string;
    const closeRep = await closeReport(reportId);
    if (closeRep.error) {
        const response: CustomResponse = {
            error: true,
            message: closeRep.data as string,
            data: null
        };
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    const response: CustomResponse = {
        error: false,
        message: "Report closed successfully",
        data: closeRep.data
    };
    return res.status(HttpCodes.OK).json(response);
});

