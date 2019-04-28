import { injectable, inject } from "inversify";
import { TYPES_SERVICE } from "../config/ioc/Inversify.type.defs";
import { UserService } from "../data/services/UserService";
import { Request, Response } from "express";
import { isEmpty } from "../util/validation/isEmpty";
import { ERRORS } from "../util/ErrorMessages";
import { IUserInfoDTO } from "../data/domain/IUserInfoDTO";
import { HTTP_STATUS } from "../util/HttpStatus";

@injectable()
export class UserProcessor {
    @inject(TYPES_SERVICE.UserService)
    private readonly _userService: UserService;

    public async getCurrentUserContext(
        req: Request,
        res: Response
    ): Promise<Response> {
        const currentUser = await this._userService.findUserByPublicId(
            req.user.publicUserId
        );
        if (isEmpty(currentUser)) {
            return res.status(404).json({ err: ERRORS.USER_CONTEXT_NOT_FOUND });
        }

        const userContext: IUserInfoDTO = {
            publicUserId: currentUser.publicUserId,
            email: currentUser.email,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            phoneNumber: currentUser.phoneNumber
        };

        return res.status(HTTP_STATUS.OK).json({ user: userContext });
    }
}
