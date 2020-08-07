import { Application } from 'express';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from '../index';
import { CONFIG } from '../../Configuration/config';

export class GraphQLController {
    constructor(private app: Application) {
        this.initGraphQL(this.app);
    }

    private initGraphQL(app: Application): void {
        const ws = createServer(app);
        const subscriptionServer = new SubscriptionServer({
            execute,
            subscribe,
            schema
        }, {
            server: ws,
            path: '/subscriptions',
        });

        app.use('/graphql', cors(), graphqlHTTP({
            schema,
            graphiql: true
        }));

        ws.listen(CONFIG.WS_PORT, () => {
            console.log(`WebSocket server is running on port ${CONFIG.WS_PORT}`);
            return subscriptionServer;
        });
    }
}
