import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
var exphbs  = require('express-handlebars');

export class App {
    private readonly _app: express.Application;

    constructor() {
        this._app = express();
        this._initApplicationMiddleware();
    }

    private _initApplicationMiddleware(): void {
        this._app.use(cors());
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._initPassportConfig();
        this._initTemplateEngine();
    }

    private _initPassportConfig(): void {
        require("../config/passport/passport.config");
    }

    private _initTemplateEngine():void {
        const path = require('path');
        console.log(__dirname)
        this._app.set('views', path.join(__dirname, 'views'));
        this._app.engine('.hbs', exphbs({
            layoutsDir: path.join(this._app.get('views'), 'layouts'),
            partialsDir: path.join(this._app.get('views'), 'partials'),
            extname: '.hbs'
        }));
        this._app.set('view engine', '.hbs');

    }

    public getApp(): express.Application {
        return this._app;
    }
}
