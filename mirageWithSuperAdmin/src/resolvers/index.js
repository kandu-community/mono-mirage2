const {
  Query
} = require('./Query')
const {
  Subscription
} = require('./Subscription')
const {
  auth
} = require('./Mutation/auth')
const {
  post
} = require('./Mutation/post')
const {
  profile
} = require('./Mutation/profile')
const {
  AuthPayload
} = require('./AuthPayload')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...profile
  },
  Subscription,
  AuthPayload,
}