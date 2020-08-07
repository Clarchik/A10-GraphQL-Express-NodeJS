import { mergeTypeDefs } from 'graphql-tools';
import User from './users/user';

const typeDefs = [User];

export default mergeTypeDefs(typeDefs);
