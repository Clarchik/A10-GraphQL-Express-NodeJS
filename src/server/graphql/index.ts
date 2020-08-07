
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './types';
import resolvers from './resolvers/';

const graphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default graphQLSchema;
