const {
  GraphQLServer
} = require('graphql-yoga')
const {
  Prisma
} = require('prisma-binding')

const resolvers = {
  Query: {
    usersFilterByName(parent, args, ctx, info) {
      const where = args.filter // If no filter string is provided, then the where object will be just an empty object and no filtering conditions will be applied by the Prisma engine when it returns the response for the users query.
        ?
        { // In case there is a filter carried by the incoming args, you’re constructing a where object that expresses our two filter conditions from above. This where argument is used by Prisma to filter out those Link elements that don’t adhere to the specified conditions.
          OR: [{
              name_contains: args.filter
            },
            {
              email_contains: args.filter
            }
          ]
        } : {}

      return ctx.db.query.users({
        where
      }, info)
      // return ctx.db.query.users({args},info)
    },
    produceList(parent, args, ctx, info) {
      return ctx.db.query._Produces({}, info)
    }
  },
  Mutation: {
    create_ProduceTable(parent, {
      name,
      objArray
    }, ctx, info) {
      return ctx.db.mutation.create_ProduceTable({
          data: {
            name: name,
            produce: objArray
          }
        },
        info
      )
    }
  },
}

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql", // the auto-generated GraphQL schema of the Prisma API
      endpoint: "https://eu1.prisma.sh/public-forkbell-321/mirage-advanced/dev", // the endpoint of the Prisma API
      debug: true // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    })
  })
});

server.start({
  port: 4001
})
console.log('Server is running on http://localhost:4001')