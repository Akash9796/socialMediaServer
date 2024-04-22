import axios from "axios";
import { prismaClient } from "../../dbPrismaClient/db.js";
import { JWTService, UserService } from "../../services/jwt.js";
import { GraphqlContext } from "../../interface.js";
import { User } from "@prisma/client";

const Query = {
  varifyGoogleToken: async (_: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleOAuthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOAuthUrl.searchParams.set("id_token", googleToken);

    const { data } = await axios.get(googleOAuthUrl.toString(), {
      responseType: "json",
    });

    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!user && data) {
      await prismaClient.user.create({
        data: {
          email: data.email,
          userName: data.given_name,
          lastName: data?.family_name,
          profileImageUrl: data.picture,
        },
      });
    }

    const newUser = await prismaClient.user.findUnique({
      where: {
        email: data?.email,
      },
    });

    if (!newUser) throw new Error("New User with this email not found");

    const JWT_token = JWTService.generateToken(newUser);

    return JWT_token;
  },

  getCurrentUser: async (_: any, __: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id;
    if (!id) {
      console.log("Ctx empty hai");
      return null;
    }
    return await prismaClient.user.findUnique({ where: { id } });
  },

  getUserById: async (_: any, { id }: any, ctx: GraphqlContext) => {
    return await prismaClient.user.findUnique({ where: { id } });
  },
};

const Mutation = {
  followUser: async (_: any, { to }: { to: string }, ctx: GraphqlContext) => {
    if (!ctx.user?.id || !to) {
      console.log("Id me dikkat hai");
      return null;
    }

    await UserService.followUser(ctx.user?.id, to);
    return true;
  },

  unfollowUser: async (_: any, { to }: { to: string }, ctx: GraphqlContext) => {
    if (!ctx.user?.id || !to) {
      console.log("Id me dikkat hai");
      return null;
    }

    await UserService.unfollowUser(ctx.user?.id, to);
    return true;
  },
};

const postRelationsResolver = {
  User: {
    posts: (parent: User) =>
      prismaClient.post.findMany({ where: { authorId: parent.id } }),

    followers: async (parent: User) => {
      const result = await prismaClient.follows.findMany({
        where: { following: { id: parent.id } },
        include: {
          follower: true,
        },
      });
      return result.map((el) => el.follower);
    },

    following: async (parent: User) => {
      const result = await prismaClient.follows.findMany({
        where: { follower: { id: parent.id } },
        include: {
          following: true,
        },
      });
      return result.map((el) => el.following);
    },
  },
};

export const resolvers = { Query, postRelationsResolver, Mutation };
