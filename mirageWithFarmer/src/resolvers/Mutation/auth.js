const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = {
  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10) // In the signup mutation, the first thing to do is encrypting the User’s password using the bcryptjs library 
    const user = await ctx.db.mutation.createUser({ // The next step is to use the Prisma binding instance to store the new User in the database. Notice that you’re hardcoding the id in the selection set - nothing else. We’ll discuss this in more in detail soon.
      data: { ...args,
        password
      },
    })

    return {
      token: jwt.sign({ // You’re then generating a JWT which is signed with an APP_SECRET. You still need to create this APP_SECRET and also install the jwt library that’s used here.
        userId: user.id
      }, process.env.APP_SECRET),
      user, // Finally, you return the token and the user.
    }
  },

  async login(parent, {
    email,
    password
  }, ctx, info) { // Instead of creating a new User object, you’re now using the Prisma binding instance to retrieve the existing User record by the email address that was sent along in the login mutation. If no User with that email address was found, you’re returning a corresponding error. Notice that this time you’re asking for the id and the password in the selection set. The password is needed because it needs to be compared with the one provided in the login mutation.
    const user = await ctx.db.query.user({
      where: {
        email
      }
    }) // The next step is to compare the provided password with the one that is stored in the database. If the two don’t match up, you’re returning an error as well.
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({
        userId: user.id
      }, process.env.APP_SECRET), // In the end, you’re returning token and user again.
      user,
    }
  },
}

module.exports = {
  auth
}