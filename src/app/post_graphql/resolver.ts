import { Post } from "@prisma/client";
import { prismaClient } from "../../dbPrismaClient/db.js";
import { GraphqlContext } from "../../interface.js";

interface CreatePostPayload {
  content: string;
  imageUrl?: string | undefined;
}

const Query = {
  getAllPosts: async (_: any, __: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id;
    const posts = prismaClient.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return posts;
  },
  getImageUrlForPost: async (
    _: any,
    { imageType }: { imageType: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user?.id) throw new Error("User hai hee nahi");

    const allowedTypes = ["jpg", "jpeg", "png", "webp"];
    if (!allowedTypes.includes(imageType))
      throw new Error("Image type galat hai");
  },
};

const mutations = {
  createPost: async (
    parent: any,
    { payLoad }: { payLoad: CreatePostPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");
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
    author: async (parent: Post) => {
      return await prismaClient.user.findUnique({
        where: { id: parent.authorId },
      });
    },
  },
};

const resolvers = { Query, mutations, userRelationResolver };

export default resolvers;
