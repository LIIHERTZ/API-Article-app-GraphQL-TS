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
exports.resolversArticle = void 0;
const article_model_1 = __importDefault(require("../models/article.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
exports.resolversArticle = {
    Query: {
        getListArticles: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { sortKey, sortValue, currentPage, limitItem, filterKey, filterValue, keyword }) {
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            const find = {
                deleted: false
            };
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            if (keyword) {
                const keywordRegex = new RegExp(keyword, 'i');
                find["title"] = keywordRegex;
            }
            const articles = yield article_model_1.default.find(find).sort(sort).skip((currentPage - 1) * limitItem).limit(limitItem);
            return articles;
        }),
        getArticle: (_, agrs) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = agrs;
            const article = yield article_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return article;
        }),
    },
    Mutation: {
        createArticle: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { article }) {
            const newArticle = new article_model_1.default(article);
            yield newArticle.save();
            return newArticle;
        }),
        deleteArticle: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            yield article_model_1.default.updateOne({ _id: id }, {
                deleted: true,
                deletedAt: new Date()
            });
            return "Đã xóa bài viết";
        }),
        updateArticle: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, article }) {
            yield article_model_1.default.updateOne({ _id: id }, { $set: article, updatedAt: new Date() });
            const updatedArticle = yield article_model_1.default.findOne({ _id: id });
            return updatedArticle;
        }),
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield category_model_1.default.findOne({ _id: article.categoryId });
            return category;
        })
    }
};
