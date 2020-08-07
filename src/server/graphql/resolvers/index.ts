import { mergeResolvers } from 'graphql-tools';

import UserResolver from './user/user';

const resolvers = [UserResolver];

export default mergeResolvers(resolvers);
