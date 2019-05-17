import { Request, Response } from "express";
import {
    controller,
    httpGet,
    request,
    response,
    httpPost
} from "inversify-express-utils";
import { HTTP_STATUS } from "../util/HttpStatus";
import { inject } from "inversify";
import { TYPES_PROCESSORS } from "../config/ioc/Inversify.type.defs";
import { AuthProcessor } from "../processors/AuthProcessor";
import { validateRegistrationInput } from "../util/validation/Register";
import { validateLoginInput } from "../util/validation/Login";
import passport = require("passport");

@controller("/auth")
export class AuthenticationController {
    @inject(TYPES_PROCESSORS.AuthProcessor)
    private readonly _authProcessor: AuthProcessor;

    @httpGet("/test")
    public async testloginRoute(
        @request() req: Request,
        @response() res: Response
    ) {
        return res
            .status(HTTP_STATUS.OK)
            .json({ msg: "Auth Controller Working" });
    }

    @httpGet("/all-users", passport.authenticate("context", { session: false }))
    public async getAllUsers(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            return await this._authProcessor.getAllUsers(req, res);
        } catch (err) {
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERR)
                .json({ msg: "Something went wrong" });
        }
    }

    @httpPost("/sign-up")
    public async registerNewUser(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            const { errors, isValid } = validateRegistrationInput(req.body);
            if (isValid) {
                return this._authProcessor.registerNewUser(req, res);
            }
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors });
        } catch (err) {
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERR)
                .json({ msg: "Something went wrong" });
        }
    }

    @httpPost("/login")
    public async loginUser(@request() req: Request, @response() res: Response) {
        try {
            const { errors, isValid } = validateLoginInput(req.body);
            if (isValid) {
                return this._authProcessor.loginUser(req, res);
            }
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors });
        } catch (err) {
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERR)
                .json({ msg: "Something went wrong" });
        }
    }
}
