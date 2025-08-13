import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
    Query: {
        getListArticles: async (_, { sortKey, sortValue, currentPage, limitItem, filterKey, filterValue, keyword }) => {
            //Sort
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }

            const find = {
                deleted: false
            };
            //Filter
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }


            //Search
            if (keyword) {
                const keywordRegex = new RegExp(keyword, 'i');
                find["title"] = keywordRegex;
            }

            const articles = await Article.find(find).sort(sort).skip((currentPage - 1) * limitItem).limit(limitItem);

            return articles;
        },
        getArticle: async (_, agrs) => {
            const { id } = agrs;
            const article = await Article.findOne({
                _id: id,
                deleted: false
            });
            return article;
        },
    },
    Mutation: {
        createArticle: async (_, { article }) => {
            const newArticle = new Article(article);
            await newArticle.save();
            return newArticle;
        },
        deleteArticle: async (_, { id }) => {
            await Article.updateOne(
                { _id: id },
                {
                    deleted: true,
                    deletedAt: new Date()   
                }
            );
            return "Đã xóa bài viết";
        },
        updateArticle: async (_, { id, article }) => {
            await Article.updateOne(
                { _id: id },{ $set: article , updatedAt: new Date() });
            const updatedArticle = await Article.findOne({ _id: id });
            return updatedArticle;
        },
    },
    Article: {
        category: async (article) => {
            const category = await Category.findOne({ _id: article.categoryId });
            return category;
        }
    }
};