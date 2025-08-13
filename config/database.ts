import mongoose from "mongoose"; 

export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to database db_Article-app-GraphQL-TS');
    } catch (error) {
        console.log('Error connecting to database');
    }
};