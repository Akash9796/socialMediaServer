export const types = `#graphql

input CreatePost {
  content: String!
  imageUrl: String
}
type Post {
    id :ID!
  content :String!
  imageUrl :String
  author   : User!
  authorId :String!
}
`;
