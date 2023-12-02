"use strict";
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
var exception_1 = require("@app/exception");
var type_1 = require("@app/exception/type");
var promotions_1 = __importDefault(require("@app/models/promotions"));
var promotions_2 = __importDefault(require("@app/services/promotions"));
var promoService = new promotions_2.default(promotions_1.default, 'promotions');
var promotionController = {
    // SEARCH PAGINATION PROMOTIONS
    search: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, pageIndex, pageSize, params, result, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.params, pageIndex = _a.pageIndex, pageSize = _a.pageSize;
                    params = {
                        pageIndex: pageIndex ? Number(pageIndex) : 0,
                        pageSize: pageSize ? Number(pageSize) : 10,
                    };
                    return [4 /*yield*/, promoService.getPagination(params)];
                case 1:
                    result = _b.sent();
                    res.status(type_1.HttpStatusCode.OK).json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // CREATE PROMOTIONS
    create: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var newPromotion, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, promoService.create(req)];
                case 1:
                    newPromotion = _a.sent();
                    res.status(type_1.HttpStatusCode.OK).json(newPromotion);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log('🚀 ~ file: promotions.ts:30 ~ create: ~ error:', error_2);
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json(type_1.INTERNAL_SERVER_ERROR_MSG);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // UPDATE PROMOTIONS
    update: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, message, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, promoService.update(id, req)];
                case 2:
                    message = (_a.sent()).message;
                    res.status(type_1.HttpStatusCode.OK).json(message);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    if (error_3 instanceof exception_1.Exception) {
                        return [2 /*return*/, res.status(error_3.status).json(error_3.message)];
                    }
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json((error_3 === null || error_3 === void 0 ? void 0 : error_3.message) || type_1.INTERNAL_SERVER_ERROR_MSG);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // GET BY ID
    getById: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, promotions, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, promoService.getById(id)];
                case 2:
                    promotions = _a.sent();
                    res.status(type_1.HttpStatusCode.OK).json(promotions);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    if (error_4 instanceof exception_1.Exception) {
                        return [2 /*return*/, res.status(error_4.status).json(error_4.message)];
                    }
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json(type_1.INTERNAL_SERVER_ERROR_MSG);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    delete: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var ids, message, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ids = req.query.ids;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, promoService.delete(ids)];
                case 2:
                    message = (_a.sent()).message;
                    res.status(type_1.HttpStatusCode.OK).json(message);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    if (error_5 instanceof exception_1.Exception) {
                        return [2 /*return*/, res.status(error_5.status).json(error_5.message)];
                    }
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json(type_1.INTERNAL_SERVER_ERROR_MSG);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = promotionController;