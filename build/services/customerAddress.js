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
var CustomerAddressService = /** @class */ (function (_super) {
    __extends(CustomerAddressService, _super);
    function CustomerAddressService(model, nameService) {
        return _super.call(this, model, nameService) || this;
    }
    CustomerAddressService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var listAddress, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find()];
                    case 1:
                        listAddress = _a.sent();
                        return [2 /*return*/, listAddress];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Occur error when get ".concat(this.nameService));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomerAddressService.prototype.getAddressByCustomerId = function (customerId) {
        return __awaiter(this, void 0, void 0, function () {
            var listAddress, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find({ customerId: customerId })];
                    case 1:
                        listAddress = _a.sent();
                        return [2 /*return*/, listAddress === null || listAddress === void 0 ? void 0 : listAddress[0]];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error("Occur error when get ".concat(this.nameService));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomerAddressService.prototype.addAddress = function (customerId, req) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('req.body', req.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.model.findOneAndUpdate({ customerId: customerId }, { $push: { addressList: req.body } }, { new: true })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Occur error when get ".concat(this.nameService));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CustomerAddressService.prototype.updateAddress = function (itemAddressId, req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, city, district, ward, address, phoneNumber, isDefault, keySet, dataSet, i, element, error_4;
            var _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _a = req.body, city = _a.city, district = _a.district, ward = _a.ward, address = _a.address, phoneNumber = _a.phoneNumber, isDefault = _a.isDefault;
                        keySet = "addressList.$";
                        dataSet = [];
                        if (city) {
                            dataSet.push((_b = {}, _b["".concat(keySet, ".city")] = city, _b));
                        }
                        if (district) {
                            dataSet.push((_c = {}, _c["".concat(keySet, ".district")] = district, _c));
                        }
                        if (ward) {
                            dataSet.push((_d = {}, _d["".concat(keySet, ".ward")] = ward, _d));
                        }
                        if (address) {
                            dataSet.push((_e = {}, _e["".concat(keySet, ".address")] = address, _e));
                        }
                        if (phoneNumber) {
                            dataSet.push((_f = {}, _f["".concat(keySet, ".phoneNumber")] = phoneNumber, _f));
                        }
                        if (isDefault) {
                            dataSet.push((_g = {}, _g["".concat(keySet, ".isDefault")] = isDefault, _g));
                        }
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 6, , 7]);
                        i = 0;
                        _h.label = 2;
                    case 2:
                        if (!(i < dataSet.length)) return [3 /*break*/, 5];
                        element = dataSet[i];
                        return [4 /*yield*/, this.model.findOneAndUpdate({
                                'addressList._id': itemAddressId,
                            }, {
                                $set: element,
                            }, {
                                new: true,
                            })];
                    case 3:
                        _h.sent();
                        _h.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, { message: "Update ".concat(this.nameService, " success") }];
                    case 6:
                        error_4 = _h.sent();
                        throw new Error("Occur error when update item address");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CustomerAddressService.prototype.deleteAddress = function (itemAddressId, req) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate({
                                'addressList._id': itemAddressId,
                            }, {
                                $pull: { addressList: { _id: itemAddressId } },
                            }, {
                                new: true,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: "Delete ".concat(this.nameService, " success") }];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error("Occur error when get ".concat(this.nameService));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CustomerAddressService;
}(crudService_1.default));
exports.default = CustomerAddressService;
