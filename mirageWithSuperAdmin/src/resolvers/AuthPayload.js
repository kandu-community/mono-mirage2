/**
 * Imagine this kind of data being needed after a login:
 * 
 * mutation {
   login(
     email: "sarah@graph.cool"
     password: "graphql"
   ) {
     token
     user {
       id
       name
       links {
         url
         description
       }
     }
   }
 }
 * 
 * 
 */

// Without Auth Payload this mutation actually wouldn’t return any user data because all that could be returned about the User is their id (since that’s everything that is requested from Prisma). The way how to solve this is by implementing the additional AuthPayload resolver and retrieve the field from the mutation’s selection set there.

const AuthPayload = {
  user: async ({
    user: {
      id
    }
  }, args, ctx, info) => {
    return ctx.db.query.user({
      where: {
        id
      }
    }, info)
  },
}

module.exports = {
  AuthPayload
}