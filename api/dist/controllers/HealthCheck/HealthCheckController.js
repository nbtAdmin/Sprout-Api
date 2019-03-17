"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_express_utils_1 = require("inversify-express-utils");
const Properties_1 = require("../../config/properties/Properties");
let HealthCheckController = class HealthCheckController {
    getApiVersion() {
        const apiversion = {
            version: "1.0.0"
        };
        return apiversion;
    }
    getHeartBeat(req, res) {
        const data = {
            headers: req.headers,
            address: req.connection.remoteAddress,
            instance: Properties_1.PROPERTIES.INSTANCE_ID
        };
        return data;
    }
};
__decorate([
    inversify_express_utils_1.httpGet("/version"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthCheckController.prototype, "getApiVersion", null);
__decorate([
    inversify_express_utils_1.httpGet("/hearthbeat"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HealthCheckController.prototype, "getHeartBeat", null);
HealthCheckController = __decorate([
    inversify_express_utils_1.controller("/health")
], HealthCheckController);
exports.HealthCheckController = HealthCheckController;
//# sourceMappingURL=HealthCheckController.js.map