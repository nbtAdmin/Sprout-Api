"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Properties_1 = require("./config/properties/Properties");
const Server_1 = require("./application/Server");
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        const server = new Server_1.Server();
        server.start(Properties_1.PROPERTIES.PORT, Properties_1.PROPERTIES.NODE_ENV, Properties_1.PROPERTIES.INSTANCE_ID);
    }
    catch (err) {
        console.log(err);
    }
}))();
//# sourceMappingURL=index.js.map