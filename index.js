const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const { MONGODB } = require('./config.js')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose
  .connect(MONGODB, {useNewUrlParser: true})
  .then(() => {
    console.log('MongoDb Connected!')
    return server.listen({port: 5000});
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })