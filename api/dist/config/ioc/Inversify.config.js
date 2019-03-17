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
const Inversify_module_loader_1 = require("./Inversify.module.loader");
exports.bindings = new inversify_1.AsyncContainerModule((bind) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield Inversify_module_loader_1.asyncLoadControllers();
    }
    catch (err) {
        console.log(err);
    }
}));
//# sourceMappingURL=Inversify.config.js.map