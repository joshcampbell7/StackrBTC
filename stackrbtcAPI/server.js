const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/index");


// Define your GraphQL schema

// Define your resolvers (functions to fetch data for the schema)

async function startServer() {
  // Create an ApolloServer instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const app = express();

  // Start the server
  await server.start();

  // Apply the ApolloServer middleware to your Express app
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
