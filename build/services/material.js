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
var crudService_1 = __importDefault(require("./crudService"));
var MaterialService = /** @class */ (function (_super) {
    __extends(MaterialService, _super);
    function MaterialService(model, nameService) {
        return _super.call(this, model, nameService) || this;
    }
    // SEARCH PAGINATION
    MaterialService.prototype.getPaginationOverriding = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var pageIndex, pageSize, name, productId, comboPromotionsId, categoryId, types, cityId, districtId, wardId, fullName, from, to, role, filter, patternWithName, patternWithFullName, data, totalElement, totalPages, isLastPage, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        pageIndex = params.pageIndex, pageSize = params.pageSize, name = params.name, productId = params.productId, comboPromotionsId = params.comboPromotionsId, categoryId = params.categoryId, types = params.types, cityId = params.cityId, districtId = params.districtId, wardId = params.wardId, fullName = params.fullName, from = params.from, to = params.to, role = params.role;
                        filter = {};
                        if (name) {
                            patternWithName = { $regex: new RegExp(name, 'gi') };
                            filter.name = patternWithName;
                        }
                        if (productId) {
                            filter.productIds = productId;
                        }
                        if (comboPromotionsId) {
                            filter.comboPromotionsId = comboPromotionsId;
                        }
                        if (categoryId) {
                            filter.categoryId = categoryId;
                        }
                        if (types) {
                            filter.types = { $all: types === null || types === void 0 ? void 0 : types.split(',') };
                        }
                        if (cityId) {
                            filter.cityId = cityId;
                        }
                        if (districtId) {
                            filter.districtId = districtId;
                        }
                        if (wardId) {
                            filter.wardId = wardId;
                        }
                        if (fullName) {
                            patternWithFullName = { $regex: new RegExp(fullName, 'gi') };
                            filter.fullName = patternWithFullName;
                        }
                        if (role) {
                            filter.role = role;
                        }
                        if (from && to) {
                            filter.importDate = { $gte: from, $lte: to };
                        }
                        return [4 /*yield*/, this.model
                                .find(filter)
                                .limit(pageSize)
                                .skip(pageSize * pageIndex)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.model.find(filter).count()];
                    case 2:
                        totalElement = _a.sent();
                        totalPages = Math.ceil(totalElement / pageSize);
                        isLastPage = pageIndex + 1 >= totalPages;
                        result = {
                            data: data,
                            totalElement: totalElement,
                            pageIndex: pageIndex,
                            pageSize: pageSize,
                            totalPage: totalPages,
                            isLastPage: isLastPage,
                        };
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error("Occur error when fetching ".concat(this.nameService, " with ").concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // CREATE MATERIAL
    MaterialService.prototype.createOverriding = function (req) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var bodyRequest, totalPrice, newMaterial, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bodyRequest = req.body;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        totalPrice = (_a = bodyRequest.materialInfo) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, next) {
                            var _a, _b, _c, _d, _e;
                            var quantityConvert = ((_a = next === null || next === void 0 ? void 0 : next.quantity) === null || _a === void 0 ? void 0 : _a.includes('kg'))
                                ? ((_c = (_b = next === null || next === void 0 ? void 0 : next.quantity) === null || _b === void 0 ? void 0 : _b.split('kg')) === null || _c === void 0 ? void 0 : _c[0])
                                    ? Number((_e = (_d = next === null || next === void 0 ? void 0 : next.quantity) === null || _d === void 0 ? void 0 : _d.split('kg')) === null || _e === void 0 ? void 0 : _e[0])
                                    : 0
                                : (next === null || next === void 0 ? void 0 : next.quantity)
                                    ? Number(next === null || next === void 0 ? void 0 : next.quantity)
                                    : 0;
                            return acc + ((next === null || next === void 0 ? void 0 : next.price) || 0) * quantityConvert;
                        }, 0);
                        newMaterial = new this.model(__assign(__assign({}, bodyRequest), { totalPrice: totalPrice }));
                        return [4 /*yield*/, newMaterial.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, newMaterial];
                    case 3:
                        error_2 = _b.sent();
                        throw new Error("".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE MATERIAL
    MaterialService.prototype.deleteOverriding = function (materialId) {
        return __awaiter(this, void 0, void 0, function () {
            var material, materialIdFromDb, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.model.findOne({
                                $or: [{ _id: materialId }, { 'materialInfo._id': materialId }],
                            })];
                    case 1:
                        material = _a.sent();
                        materialIdFromDb = new Object(material === null || material === void 0 ? void 0 : material._id).valueOf();
                        if (!(materialId === materialIdFromDb)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.model.findOneAndDelete({ _id: materialId })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.model.findOneAndUpdate({ 'materialInfo._id': materialId }, {
                            $pull: { materialInfo: { _id: materialId } },
                        }, { new: true })];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        error_3 = _a.sent();
                        throw new Error("".concat(error_3));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return MaterialService;
}(crudService_1.default));
exports.default = MaterialService;
