import { HTTP_STATUS } from "./HttpStatus";
import { Response } from "express";

export const responseHandler = {
    getResponse: (res:Response, body:{}, status:HTTP_STATUS) :  Response => {
        return res.status(status).json(body);
    }
}