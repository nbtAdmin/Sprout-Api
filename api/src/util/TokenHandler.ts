import * as jwt from "jsonwebtoken";
import { JWT } from "../config/properties/Properties";

export const GenerateUserAccessToken = (_publicUserId, _email) => {
    const jwtPayload = {
        ISSUER: JWT.ISSUER,
        sub: _publicUserId,
        email: _email
    };

    return jwt.sign(jwtPayload, JWT.JWT_SECRET, { expiresIn: JWT.JWT_EXP });
};

//TODO:IMPLEMENT REFRESH TOKEN MECHANISM
export const GenerateUserRefreshToken = () => {};
