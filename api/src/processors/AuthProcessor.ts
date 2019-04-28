import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import { responseHandler } from "../util/ResponseHandler";
import { HTTP_STATUS } from "../util/HttpStatus";
import { TYPES_SERVICE } from "../config/ioc/Inversify.type.defs";
import { UserService } from "../data/services/UserService";
import { User } from "../data/entities/User";
import { IUserInfoDTO } from "../data/domain/IUserInfoDTO";
import * as uuid from "uuid";
import * as bcrpyt from "bcryptjs";
import { DATE_FORMAT } from "../config/properties/Properties";
import { ERRORS } from "../util/ErrorMessages";
import { EAccountType } from "../data/domain/EAccountType";
import { isEmpty } from "../util/validation/isEmpty";
import { GenerateUserAccessToken } from "../util/TokenHandler";

const moment = require("moment");

@injectable()
export class AuthProcessor {
    @inject(TYPES_SERVICE.UserService)
    private readonly _userService: UserService;

    public async getAllUsers(req: Request, res: Response): Promise<Response> {
        const AllUsers: User[] = await this._userService.getAllUsers();
        const userResponse: IUserInfoDTO[] = new Array<IUserInfoDTO>();

        AllUsers.forEach(user => {
            const userInfo: IUserInfoDTO = {
                publicUserId: user.publicUserId,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            };
            userResponse.push(userInfo);
        });

        const resBody = { users: userResponse };
        return responseHandler.getResponse(res, resBody, HTTP_STATUS.OK);
    }

    public async registerNewUser(
        req: Request,
        res: Response
    ): Promise<Response> {
        const userExists = await this.isUniqueEmail(req.body.email);
        if (userExists) {
            return res
                .status(HTTP_STATUS.CONFLICT)
                .json({ err: ERRORS.EMAIL_CONFLICT });
        }

        const newUser: User = await this.prepareNewUserRequest(req.body);
        if (!newUser) {
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERR)
                .json({ err: ERRORS.INTERNAL_SERVER_ERR });
        }

        const registerUser: User = await this._userService.createNewUser(
            newUser
        );
        if (!registerUser) {
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERR)
                .json({ err: ERRORS.INTERNAL_SERVER_ERR });
        }

        const newUserResponse: IUserInfoDTO = {
            publicUserId: registerUser.publicUserId,
            email: registerUser.email,
            firstName: registerUser.firstName,
            lastName: registerUser.lastName,
            phoneNumber: registerUser.phoneNumber,
            accountType: registerUser.accountType
        };
        return res
            .status(HTTP_STATUS.CREATED)
            .json({ msg: ERRORS.SUCCESS_REG_USER, user: newUserResponse });
    }

    private async prepareNewUserRequest(_requestBody: any): Promise<User> {
        const newUser = new User();

        newUser.publicUserId = uuid();
        newUser.email = _requestBody.email;
        newUser.password = await bcrpyt.hash(_requestBody.password, 10);
        newUser.firstName = _requestBody.firstName;
        newUser.lastName = _requestBody.lastName;
        newUser.phoneNumber = _requestBody.phoneNumber;
        newUser.accountType = EAccountType.LOCAL;
        newUser.createdDate = moment().format(DATE_FORMAT);

        return newUser;
    }

    private async isUniqueEmail(_email: string): Promise<Boolean> {
        const emailExists = await this._userService.findUserByEmail(_email);
        if (isEmpty(emailExists)) {
            return false;
        }
        return true;
    }

    public async loginUser(req: Request, res: Response): Promise<Response> {
        const user = await this._userService.findUserByEmail(req.body.email);
        if (isEmpty(user)) {
            return res
                .status(HTTP_STATUS.NOT_FOUND)
                .json({ err: ERRORS.EMAIL_NOT_FOUND });
        }
        if (user.accountType !== EAccountType.LOCAL) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST)
                .json({ err: ERRORS.BAD_ACCOUNT_TYPE_LOGIN });
        }

        const passwordMatched: Boolean = await bcrpyt.compare(
            req.body.password,
            user.password
        );
        if (!passwordMatched) {
            return res
                .status(HTTP_STATUS.UNAUTHORIZED)
                .json({ err: ERRORS.WRONG_PASSWORD });
        }

        //TODO: ADD REFRESH TOKEN IMPLEMENTATION
        const jwtToken = GenerateUserAccessToken(user.publicUserId, user.email);
        if (!jwtToken) {
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERR)
                .json({ err: ERRORS.CREATE_TOKEN_ERR });
        }

        const userInfo: IUserInfoDTO = {
            publicUserId: user.publicUserId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            accountType: user.accountType
        };

        return res.status(HTTP_STATUS.OK).json({
            access_token: `Bearer ${jwtToken}`,
            user: userInfo
        });
    }
}
