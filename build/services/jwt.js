import JWT from "jsonwebtoken";
import { prismaClient } from "../dbPrismaClient/db.js";
const JWT_Secret = "vnb87vyeve";
export class JWTService {
    static async generateToken(user) {
        const payload = {
            id: user?.id,
            email: user?.email,
        };
        const token = await JWT.sign(payload, JWT_Secret);
        return token;
    }
    static async decodeToken(token) {
        try {
            return await JWT.verify(token, JWT_Secret);
        }
        catch (error) {
            return null;
        }
    }
}
export class UserService {
    static followUser(from, to) {
        console.log("Follow");
        return prismaClient.follows.create({
            data: {
                follower: { connect: { id: from } },
                following: { connect: { id: to } },
            },
        });
    }
    static unfollowUser(from, to) {
        return prismaClient.follows.delete({
            where: { followerId_followingId: { followerId: from, followingId: to } },
        });
    }
}
