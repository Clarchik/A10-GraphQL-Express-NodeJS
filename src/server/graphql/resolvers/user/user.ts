import { find } from 'lodash';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
const USER_ADDED_TOPIC = 'USER_ADDED';

const users = [
    { _id: '1', name: '1', email: '1@mail.ru' },
    { _id: '2', name: '2', email: '2@mail.ru' },
    { _id: '3', name: '3', email: '3@mail.ru' }
];

export default {
    Query: {
        user: async (parent: any, { _id }: { _id: string }, context: any, info: any) => {
            return await new Promise((resolve, reject) => {
                const foundUser = find(users, (user) => user._id === _id);
                foundUser ? resolve(foundUser) : reject('User not found');
            });
        },
        users: async () => {
            return await new Promise((resolve, reject) => {
                resolve(users);
            });
        },
    },
    Mutation: {
        addUser: (root: any, { _id, name, email }: { _id: string, name: string, email: string }) => {
            const user = { _id, name, email };
            users.push(user);
            return new Promise((resolve, reject) => {
                pubSub.publish(USER_ADDED_TOPIC, { userAdded: user });
                resolve(user);
            });
        },
    },
    Subscription: {
        userAdded: {
            subscribe: () => pubSub.asyncIterator(USER_ADDED_TOPIC)
        }
    }
};
