import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link';

const URL = 'http://localhost:3000/graphql';
const WS_URL = 'ws://localhost:3001/subscriptions';
export function createApollo(httpLink: HttpLink, apollo: Apollo): any {
    const http = httpLink.create({ uri: URL });
    const ws = new WebSocketLink({ uri: WS_URL, options: { reconnect: true } });
    const link = split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query) as any;
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        ws,
        http,
    );
    return {
        link,
        cache: new InMemoryCache()
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule { }
