export const types = `#graphql 
type CreatePost {
    content:String!
    imageUrl:String
}
type Post {
    id :ID!
  content :String!
  authorId :String!
  imageUrl :String
  author   : User!
  authorId :String!
}
`;
