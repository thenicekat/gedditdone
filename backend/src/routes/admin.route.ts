import { Router } from "express";
import { HttpCodes } from "../types/HttpCodes";
import { CustomResponse } from "../types/CustomResponse";
import { getAllUsers, promoteUser } from "../service/admin.service";

export const adminRouter = Router();

adminRouter.get("/home", async(_,res)=>{
    const appUsers = await getAllUsers();

    if (appUsers.error) {
        const response: CustomResponse = {
            error: true,
            message: "Error retrieving users",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }

    if (typeof appUsers.data != "string") {
        const normalUsers = appUsers?.data?.filter((u: any) => u.role !== 'admin');

        const response: CustomResponse = {
            error: false,
            message: "All users retrieved successfully",
            data: normalUsers
        }

        return res.status(HttpCodes.OK).json(response);
    } else {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(appUsers.data);
    }
})

adminRouter.put("/promote/:user", async(req, res) => {
    const userId = req.params.user;
    const pro = await promoteUser(userId);

    if(pro.error){
        const response: CustomResponse = {
            error: true,
            message: "Error retrieving users",
            data: null
        }
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(response);
    }else{
        const response: CustomResponse = {
            error: false,
            message: "selected user is now an admin",
            data: pro
        }

        return res.status(HttpCodes.OK).json(response);
    }
})