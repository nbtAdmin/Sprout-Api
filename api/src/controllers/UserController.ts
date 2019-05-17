import {
    controller,
    httpGet,
    request,
    response
} from "inversify-express-utils";
import { inject } from "inversify";
import {
    TYPES_SERVICE,
    TYPES_PROCESSORS
} from "../config/ioc/Inversify.type.defs";
import { Request, Response } from "express";
import passport = require("passport");
import { UserProcessor } from "../processors/UserProcessor";
import { HTTP_STATUS } from "../util/HttpStatus";
import { ERRORS } from "../util/ErrorMessages";

@controller("/user")
export class UserController {
    @inject(TYPES_PROCESSORS.UserProcessor)
    private readonly _userProcessor: UserProcessor;

    @httpGet("/current", passport.authenticate("context", { session: false }))
    public async getCurrentUserContext(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            return this._userProcessor.getCurrentUserContext(req, res);
        } catch (err) {
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERR)
                .json({ err: ERRORS.INTERNAL_SERVER_ERR });
        }
    }
}
