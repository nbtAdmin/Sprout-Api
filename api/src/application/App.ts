import * as express from "express";
import * as bodyParser from "body-parser";

export class App {
    private readonly _app: express.Application;

    constructor() {
        this._app = express();
        this._initApplicationMiddleware();
    }

    private _initApplicationMiddleware(): void {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._initPassportConfig();
    }

    private _initPassportConfig(): void {
        require("../config/passport/passport.config");
    }

    public getApp(): express.Application {
        return this._app;
    }
}
