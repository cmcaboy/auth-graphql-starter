const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      // resolve offers a 3rd argument: request
      // This represents the request object coming from express
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req })
      }
    },
    logout: {
      type: UserType, 
      resolve(parentValue, args, req) {
        // we have to save a ref to the user because we won't get access to it after we logout.
        const { user } = req; 
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      }, 
      resolve(parentValue, {email,password}, req) {
        // we have to save a ref to the user because we won't get access to it after we logout.
        return AuthService.login({email, password, req})
      }
    }
  }
})

module.exports = mutation;
