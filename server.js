import { ApolloServer, gql } from 'apollo-server';


// GET /text
// GET /hello
// GET /allFilms

const typeDefs = gql`
  type User {
    id: ID!,
    username: String!,
    age: Number!
  }
  type Tweet {
    id: ID!,
    text: String!,
    author: User!
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`
const server = new ApolloServer({ typeDefs });

server.listen().then(({adress, family, url, port, server}) => {
  console.log(adress, family, url, port)
})