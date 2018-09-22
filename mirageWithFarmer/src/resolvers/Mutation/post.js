const {
  getUserId
} = require('../../utils')


const post = {
  async createDraft(parent, {
    title,
    text
  }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createPost({
        data: {
          title,
          text,
          isPublished: false,
          author: {
            connect: {
              id: userId
            },
          },
        },
      },
      info
    )
  },

  async publish(parent, { // Only the author of a Post should be able to publish it.
    id
  }, ctx, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: {
        id: userId
      },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.updatePost({
        where: {
          id
        },
        data: {
          isPublished: true
        },
      },
      info,
    )
  },

  async deletePost(parent, { // Only the author of a Post node or an ADMIN user should be able to delete it.
    id
  }, ctx, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: {
        id: userId
      },
    })

    const requestingUserIsAdmin = await ctx.db.exists.User({
      id: userId,
      author: {
        id: userId
      },
    })

    if (!postExists && !requestingUserIsAdmin) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.deletePost({
      where: {
        id
      }
    })
  },
}

module.exports = {
  post
}