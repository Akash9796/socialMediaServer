import { User } from "@prisma/client";
import JWT from "jsonwebtoken";
import { JWTUser } from "../interface.js";
import { prismaClient } from "../dbPrismaClient/db.js";

const JWT_Secret = "vnb87vyeve";

export class JWTService {
  public static async generateToken(user: User) {
    const payload: JWTUser = {
      id: user?.id,
      email: user?.email,
    };
    const token = await JWT.sign(payload, JWT_Secret);
    return token;
  }

  public static async decodeToken(token: string) {
    try {      
      return await JWT.verify(token, JWT_Secret) as JWTUser;
    } catch (error) {
      return null;
    }
  }
}

export class UserService {
  public static followUser(from: string, to: string) {
    console.log("Follow");
    
    return prismaClient.follows.create({
      data: {
        follower: { connect: { id: from } },
        following: { connect: { id: to } },
      },
    });
  }
  public static unfollowUser(from: string, to: string) {
    return prismaClient.follows.delete({
      where: { followerId_followingId: { followerId: from, followingId: to } },
    });
  }
}
