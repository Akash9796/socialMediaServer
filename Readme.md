1. npm init -y
2. install npm i typescript mongoose express cors dotenv body-parser -d; npm i @types/express @types/node
3. {
   "compilerOptions": {
   "target": "ES2020",
   "module": "NodeNext" /_ Specify what module code is generated. _/,
   "rootDir": "src",
   "moduleResolution": "NodeNext",
   "outDir": "build",
   "esModuleInterop": true,
   "strict": true /_ Enable all strict type-checking options. _/,
   "skipLibCheck": true /_ Skip type checking all .d.ts files. _/
   }
   }
4. "scripts": {
   "start": "node build/index.js",
   "build": "tsc",
   "watch": "tsc -w",
   "dev": "nodemon build/index.js",
   "dev:concurrent": "concurrently \"npm run watch\" \"npm run dev\""
   },
5. type "yarn dev:concurrent" to generate build ;
6. Setup Graphql --> yarn add @apollo/server graphql
7. Create a supabase project.
8. Setup Prisma ORM. => npm i prisma --save-dev , npx prisma init --datasource-provider postgresql ,yarn add @prisma/client
9. Paste Dadabase URI in .env from supabase.
10. Inside prisma.schema -> Create Models
11. run --> npx prisma migrate dev --name added_user_model --> do this everytime u change your schema.
12. Create src/client/db.ts file -> create new PrismaClient --> in app/index --> prismaClient.user.create({..})
13. Recieve credential token from user login & fetch user details init using axios & googleOAuthUrl.
14. Now check weather we already have this user in db, if not then create a new user & generate accessToken for him.

---

<!-- JWTServices -->

15. Create a generateToken(user)=>{} --> inside which > 1st bunlde User details in an obj {id,email}>2nd generate token = JWT.sign({details obj},JWT_Secret);
16. Implement Bearer token based login Authentication ->
17. Create a decodeToken(token)=>{}, in JWTservices
18. Enter an object of key & val pair in ApolloServer middleware, where key="context" & val = async({req,res})=>{...returns {user:JWTService.decodeToken(req.headers?.authorization)}}.
19. Now this context will be available in each resolver we create.It's done for catching the login user details
20. write a new query & resolver as getCurrentUser

---

1. Create Post mutation functionality.
2. Write schema.prima model for Post, establish relations btw Posts & User ; npx prisma migrate dev --name added_post_model
3. Create all gql files(resolvers.ts,queries,mutation,types) ,
4. Inside resolver function use " await prismaClient.post.create({data:{..schema key & value}})" to create new Posts .
5. Write resolvers for relations btw "Post" & "User"
6. Spread all posts.gql.ts files in main graphql index.ts

---

1. Create getUserById graphql query.
2. Write Query & Resolver for that,

---

1. Create model Follows in schema.prisma to follow/unfollow
2. Write class UserService then funcs init to follow & unfollow
3. Create all gql files ( Types + Mutations + Resolver) for user
