"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this._app = express();
        this._initApplicationMiddleware();
    }
    _initApplicationMiddleware() {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));
    }
    getApp() {
        return this._app;
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map