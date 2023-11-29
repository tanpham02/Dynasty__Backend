"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crudService_1 = __importDefault(require("@app/services/crudService"));
var customer_1 = __importDefault(require("@app/models/customer"));
var exception_1 = require("@app/exception");
var type_1 = require("@app/exception/type");
var bcrypt_1 = require("bcrypt");
var constants_1 = require("@app/constants");
var CustomerService = /** @class */ (function (_super) {
    __extends(CustomerService, _super);
    function CustomerService(model, nameService) {
        return _super.call(this, model, nameService) || this;
    }
    // UPDATE
    CustomerService.prototype.updateOverriding = function (id, req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var dataUpdate, isCustomerAlreadyExist, existCustomer, newDataUpdate, exception, exception, salt, passwordAfterHash;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        dataUpdate = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.customerInfo) ? JSON.parse((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.customerInfo) : {};
                        return [4 /*yield*/, this.getById(id)];
                    case 1:
                        isCustomerAlreadyExist = _c.sent();
                        return [4 /*yield*/, customer_1.default.findOne({
                                $or: [{ phoneNumber: dataUpdate === null || dataUpdate === void 0 ? void 0 : dataUpdate.phoneNumber }, { email: dataUpdate === null || dataUpdate === void 0 ? void 0 : dataUpdate.email }],
                            })];
                    case 2:
                        existCustomer = _c.sent();
                        newDataUpdate = {};
                        if (!isCustomerAlreadyExist) {
                            exception = new exception_1.Exception(type_1.HttpStatusCode.NOT_FOUND, "".concat(this.nameService, " not found"));
                            throw exception;
                        }
                        if (existCustomer) {
                            exception = new exception_1.Exception(type_1.HttpStatusCode.CONFLICT, "".concat(this.nameService, " already exist"));
                            throw exception;
                        }
                        if (Object.keys(dataUpdate).length) {
                            newDataUpdate = __assign({}, dataUpdate);
                        }
                        if (!(newDataUpdate === null || newDataUpdate === void 0 ? void 0 : newDataUpdate.password)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, bcrypt_1.genSalt)(constants_1.SALT)];
                    case 3:
                        salt = _c.sent();
                        return [4 /*yield*/, (0, bcrypt_1.hash)(newDataUpdate.password, salt)];
                    case 4:
                        passwordAfterHash = _c.sent();
                        newDataUpdate.password = passwordAfterHash;
                        _c.label = 5;
                    case 5: return [4 /*yield*/, this.model.findByIdAndUpdate(id, newDataUpdate, { new: true })];
                    case 6:
                        _c.sent();
                        return [2 /*return*/, { message: "Update ".concat(this.nameService, " success") }];
                }
            });
        });
    };
    return CustomerService;
}(crudService_1.default));
exports.default = CustomerService;
