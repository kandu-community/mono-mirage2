const {
  getUserId
} = require('../utils')

const Query = {

  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({
      where: {
        isPublished: true
      }
    }, info)
  },

  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({
      where
    }, info)
  },

  async tenUsers(parent, args, ctx, info) {
    const first = 10
    return ctx.db.query.users({ //  the first parameter in these function calls is an object that carries the arguments for the query/mutation, the second one is the selection set (as a string) that determines what data should be contained in the response.
      first
    }, '{ id role name password }')
  },

  async post(parent, { // Only the author of a Post or an ADMIN user should be able to access Post nodes using the post query.
    id
  }, ctx, info) {
    const userId = getUserId(ctx)
    const requestingUserIsAuthor = await ctx.db.exists.Post({ // Return true IF: the User who sent the request is in fact the author of the Post that was requested
      id,
      author: {
        id: userId,
      },
    })

    const requestingUserIsAdmin = await ctx.db.exists.User({ // Return true IF: the User who sent the request is an ADMIN
      id: userId,
      role: 'ADMIN'
    })

    if (requestingUserIsAdmin || requestingUserIsAuthor) {
      return ctx.db.query.post({
        where: {
          id
        }
      }, info)

    }
    throw new Error(
      'Invalid permissions, you must be an admin or the author of this post to retrieve it',
    )
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({
      where: {
        id
      }
    }, '{ name email role id }')
  },
}

module.exports = {
  Query
}