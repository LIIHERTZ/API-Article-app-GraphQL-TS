import { resolversCategory } from './category.resolver';
import {resolversArticle} from "./article.resolver";
import {resolversUser} from "./user.resolver"

export const resolvers = [
    resolversCategory, 
    resolversArticle,
    resolversUser
];