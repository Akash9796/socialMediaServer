import { types } from "./types.js";
import { Query } from "./queries.js";
import { mutations } from "./mutation.js";
import resolvers from "./resolver.js";

export const Post = { Query, types, mutations, resolvers };
