import Category from "../models/category.model";

export const resolversCategory = {
    Query: {
        getListCategories: async () => {
            const categories = await Category.find({
                deleted: false
            });
            return categories;
        },
        getCategory: async (_, args) => {
            const { id } = args;
            const category = await Category.findOne({
                _id: id,
                deleted: false
            });
            return category;
        }
    },
    Mutation: {
        createCategory: async (_, { category }) => {
            const newCategory = new Category(category);
            await newCategory.save();
            return newCategory; 
        },
        updateCategory: async (_, { id, category }) => {
            await Category.updateOne(
                { _id: id }, { $set: category, updatedAt: new Date() }
            );
            const updatedCategory = await Category.findOne({ _id: id });
            return updatedCategory;
        },
        deleteCategory: async (_, { id }) => {
            await Category.updateOne(
                { _id: id },
                {
                    deleted: true,
                    deletedAt: new Date()
                }
            );
            return "Đã xóa danh mục";
        }
    },
};