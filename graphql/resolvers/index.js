const resolvers = {
  Query: {
    users() {
      return [
        {
          id: 1,
          name: 'John',
          username: 'Doe'
        }
      ]
    }
  }
}