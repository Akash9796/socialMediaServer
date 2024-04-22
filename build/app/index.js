import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import express from "express";
import { prismaClient } from "../dbPrismaClient/db.js";
import { User } from "./userGraph/index.js";
import cors from "cors";
import { JWTService } from "../services/jwt.js";
import { Post } from "./post_graphql/index.js";
export async function initServer() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    prismaClient.user.create({
        data: { email: "", userName: "" },
    });
    const graphqlServer = new ApolloServer({
        typeDefs: `
    ${User.types}
    ${Post.types}
    type Query{
        ${User.Query}
        ${Post.Query}
    }
    type Mutation{
        ${Post.mutations}
        ${User.mutations}
    }
    `,
        resolvers: {
            Query: { ...User.resolvers.Query, ...Post.resolvers.Query },
            Mutation: {
                ...Post.resolvers.mutations,
                ...User.resolvers.Mutation,
            },
            ...Post.resolvers.userRelationResolver,
            ...User.resolvers.postRelationsResolver,
        },
    });
    await graphqlServer.start();
    app.use("/graphql", expressMiddleware(graphqlServer, {
        context: async ({ req, res }) => {
            const user = req.headers.authorization
                ? await JWTService.decodeToken(req.headers.authorization.split("Bearer ")[1])
                : undefined;
            return { user };
        },
    }));
    return app;
}
