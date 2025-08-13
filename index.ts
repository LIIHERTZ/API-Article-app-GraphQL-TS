import dotenv from "dotenv";    
import express, {Express ,Request, Response} from "express";
import * as database from "./config/database";
import {ApolloServer} from "apollo-server-express";
import {resolvers} from "./resolver/index.resolver";
import {typeDefs} from "./typeDefs/index.typeDefs";
import { requireAuth } from "./middlewares/auth.middleware";



const startServer =  async () =>{
    dotenv.config();

    const app : Express = express();

    database.connect();

    const port : Number | String = process.env.PORT;

    app.use("/graphql", requireAuth);

    const apolloServer = new ApolloServer({ 
        typeDefs,
        resolvers,
        introspection: true,
        context: ({ req }) => {
            return { ...req };
        }
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ 
        app: app,
        path: "/graphql"
    });

    app.listen(port, () => {
        console.log(`Đã khởi tạo server trên port ${port}`)
    });
};

startServer();