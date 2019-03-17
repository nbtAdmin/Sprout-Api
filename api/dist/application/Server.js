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
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const App_1 = require("./App");
const Inversify_config_1 = require("../config/ioc/Inversify.config");
const DatabaseConnection_1 = require("../config/database/DatabaseConnection");
class Server {
    constructor() {
        this._app = new App_1.App().getApp();
        this._di_container = new inversify_1.Container();
        this._db = new DatabaseConnection_1.DatabaseConnection();
    }
    _initServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._di_container.loadAsync(Inversify_config_1.bindings);
            this._instance = new inversify_express_utils_1.InversifyExpressServer(this._di_container, null, { rootPath: "/api/v1" }, this._app);
        });
    }
    start(PORT, NODE_ENV, INSTANCE_ID) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._initServer();
            yield this._db.initConnection();
            this._instance.build().listen(PORT, () => {
                console.log(`Application initialized with env: ${NODE_ENV} with InstanceId: ${INSTANCE_ID}`);
                console.log(`Server listening on port ${PORT}`);
            });
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map