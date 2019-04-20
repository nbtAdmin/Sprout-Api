import * as passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JWT } from "../properties/Properties";
import { User } from "../../data/entities/User";

export interface payload {
    sub: string;
    email: string;
}

passport.use(
    "context",
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT.JWT_SECRET
        },
        (_jwtPayload: payload, done) => {
            User.findOne({ email: _jwtPayload.email })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    )
);
