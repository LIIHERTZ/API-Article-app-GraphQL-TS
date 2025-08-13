import User from "../models/user.model";
import md5 from "md5";
import {generateRandomString} from "../helpers/generate";
import { Query } from "mongoose";

export const resolversUser = {
    Query:{
        getUser: async (_, { id }, context) => {
            const user = await User.findOne({ 
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
        }
    },
    Mutation: {
        registerUser: async (_, { user }) => {
            const existEmail = await User.findOne({ email: user.email });
            if (existEmail) {
                return {
                    code: 400,
                    message: "Email đã tồn tại!"
                };
            }
            else{
                user.password = md5(user.password);
                user.token = generateRandomString(30);

                const newUser = new User(user);
                const data = await newUser.save();
                return {
                    code: 200,
                    message: "Đăng ký thành công!",
                    id: data._id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token
                };
            }
        },
        loginUser: async (_, { user }) => {
            const existUser = await User.findOne({ email: user.email});
            if (!existUser) {
                return {
                    code: 400,
                    message: "Email không đúng!"
                };
            }
            if (md5(user.password) !== existUser.password) {
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
        }
    },
};