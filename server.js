import { ApolloServer, gql } from 'apollo-server';
import fetch from 'node-fetch';

// GET /text
// GET /hello
// GET /allFilms

let tweets = [
  {
    id: '1',
    text: 'first data',
    userId: '2'
  },
  {
    id: '2',
    text: 'second Data', 
    userId: '1'
  }
]

let users = [
  {
    id: '1',
    username: 'ajryd',
    age: 32,
    height: 182
  },
  {
    id: '2',
    username: 'Elon musk',
    age: 51,
    height: 190
  }
]

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    age: Int!
    height: Int!
    """
    Info is username & age & height combination
    """
    info: String!
  }
  """
  Tweet object represents a resource for a Tweet!
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    ping: String!
    allUsers: [User!]!
    allMovies: [Movie!]!
    movie(id: String!): Movie
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
  type Movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    yearrating: Float!
    runtime: Float!
    genres: [String]!
    summary: String!
    description_full: String!
    synopsis: String!
    yt_trailer_code: String!
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_imagelarge_cover_image: String!
  }
`

const resolvers = {
  Query: {
    tweet(root, args) {
      console.log('%cCalled!', 'color: red')
      console.log(root, args)
      return tweets.filter(tweet => tweet.id === args.id)[0];
    },
    ping: () => {
      return 32 
    },
    allTweets: () => {
      return tweets;
    },
    allUsers: () => {
      return users;
    },
    allMovies: () => {
      return fetch("https://yts.mx/api/v2/list_movies.json").then(r => r.json()).then(json => json.data.movies)
    },
    movie: (_, { id }) => {
      return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`).then(r => r.json()).then(json => json.data.movie)
    }
  },
  Mutation: {
    postTweet: (_, { text, userId }) => {
      const newTweet = {
        id: tweets.length + 1,
        text: text,
        userId,
      }
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet: (_, { id }) => {
      const tweet = tweets.find(tweet => tweet.id === id);
      if(!tweet) return false;
      tweets = tweets.filter(tweet => tweet.id !== id);
      return true;
    },
  },
  User: {
    info: ({ username, age, height }) => {
      return `${username} is ${age} Year Old & ${height} cm tall`
    } 
  },
  Tweet: {
    author: ({ userId }) => {
      return users.find(user => user.id === userId);
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({adress, family, url, port, server}) => {
  console.log(adress, family, url, port)
})