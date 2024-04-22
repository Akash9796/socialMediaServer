export const mutations = {
    createPost: (parent, { payLoad }, ctx) => {
        if (!ctx.user)
            throw new Error("You are not authenticated");
    },
};
