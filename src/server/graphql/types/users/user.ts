
const userSchema = `
    type User {
        _id: String!
        name: String!
        email: String!
    }

    type Query {
        user(_id: ID!): User!
        users: [User!]!
    }

    type Mutation {
        addUser(_id: String!, name: String!, email: String!): User
    }

    type Subscription {
        userAdded: User
    }
`;

export default userSchema;
