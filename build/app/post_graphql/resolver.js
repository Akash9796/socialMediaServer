import { prismaClient } from "../../dbPrismaClient/db.js";
const Query = {
    getAllPosts: async (_, __, ctx) => {
        const id = ctx.user?.id;
        const posts = prismaClient.post.findMany({
            orderBy: { createdAt: "desc" },
        });
        return posts;
    },
    getImageUrlForPost: async (_, { imageType }, ctx) => {
        if (!ctx.user?.id)
            throw new Error("User hai hee nahi");
        const allowedTypes = ["jpg", "jpeg", "png", "webp"];
        if (!allowedTypes.includes(imageType))
            throw new Error("Image type galat hai");
    },
};
const mutations = {
    createPost: async (parent, { payLoad }, ctx) => {
        if (!ctx.user)
            throw new Error("You are not authenticated");
        console.log(payLoad);
        const postCreated = await prismaClient.post.create({
            data: {
                content: payLoad.content,
                imageUrl: payLoad.imageUrl || "",
                author: { connect: { id: ctx.user.id } },
            },
        });
        return postCreated;
    },
};
const userRelationResolver = {
    Post: {
        author: async (parent) => {
            return await prismaClient.user.findUnique({
                where: { id: parent.authorId },
            });
        },
    },
};
const resolvers = { Query, mutations, userRelationResolver };
export default resolvers;
