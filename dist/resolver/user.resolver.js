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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const generate_1 = require("../helpers/generate");
exports.resolversUser = {
    Query: {
        getUser: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { id }, context) {
            const user = yield user_model_1.default.findOne({
                token: context.user.token,
                deleted: false
            });
            if (!user) {
                return {
                    code: 404,
                    message: "User not found"
                };
            }
            return {
                code: 200,
                message: "User found",
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: user.token
            };
        })
    },
    Mutation: {
        registerUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { user }) {
            const existEmail = yield user_model_1.default.findOne({ email: user.email });
            if (existEmail) {
                return {
                    code: 400,
                    message: "Email đã tồn tại!"
                };
            }
            else {
                user.password = (0, md5_1.default)(user.password);
                user.token = (0, generate_1.generateRandomString)(30);
                const newUser = new user_model_1.default(user);
                const data = yield newUser.save();
                return {
                    code: 200,
                    message: "Đăng ký thành công!",
                    id: data._id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token
                };
            }
        }),
        loginUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { user }) {
            const existUser = yield user_model_1.default.findOne({ email: user.email });
            if (!existUser) {
                return {
                    code: 400,
                    message: "Email không đúng!"
                };
            }
            if ((0, md5_1.default)(user.password) !== existUser.password) {
                return {
                    code: 400,
                    message: "Mật khẩu không đúng!"
                };
            }
            return {
                code: 200,
                message: "Đăng nhập thành công!",
                id: existUser._id,
                fullName: existUser.fullName,
                email: existUser.email,
                token: existUser.token
            };
        })
    },
};
