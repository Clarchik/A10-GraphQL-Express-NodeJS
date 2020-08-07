import express, { Application } from 'express';
import { GraphQLController } from './graphql/module/graphql.controller';

class App {
    public app: Application;
    private graphQLController: GraphQLController;
    constructor() {
        this.app = express();
        this.graphQLController = new GraphQLController(this.app);
    }
}

export default new App().app;
