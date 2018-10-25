require('newrelic');
import 'reflect-metadata';
import { GraphQLApp } from '@graphql-modules/core';
import { webhooksModule } from "@modules/webhooks";
import { ApolloServer, Config } from 'apollo-server-express';
import * as express from 'express';
import * as bodyParser from "body-parser";
import { createLocalTunnel } from "./local-dev";
import { MongoClient } from "mongodb";
import { PullRequestDbObject } from "./generated-models";
import { createServer } from "http";
import { clientAuth, klmAuth } from "./auth";
import * as cors from 'cors';

const PORT = 3001;

async function main(): Promise<any> {
  const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(dbUrl, { useNewUrlParser: true });
  await client.connect().then(() => console.log('SUCCESFULLY CONNECTED TO MONGODB')).catch(err => console.error('CANNOT CONNECT TO MONGODB:', err));
  const db = client.db(process.env.MONGODB_URI ? undefined : 'guild-review');
  const pullRequests = db.collection<Partial<PullRequestDbObject>>('pull_requests');

  const listener = express();
  listener.use(cors());
  listener.use(bodyParser.json());
  listener.use(/^((?!\/webhooks\/).)*$/, clientAuth);
  listener.use('/webhooks/klm', klmAuth);
  let exposedServerUrl = '';

  if (process.env.NODE_ENV !== 'production') {
    exposedServerUrl = await createLocalTunnel(parseInt(process.env.PORT) || PORT, 'bitbucket-webhooks');
    console.log('Local tunnel URL:', exposedServerUrl);
  }

  const graphQlApp = new GraphQLApp({
    modules: [
      webhooksModule.withConfig({
        pullRequests,
        serverUrl: exposedServerUrl,
        expressApp: listener,
      }),
    ],
  });

  const serverConfig = graphQlApp.generateServerConfig<Config>({
    introspection: true,
  });

  const server = new ApolloServer(serverConfig);

  server.applyMiddleware({
    app: listener,
    path: '/graphql',
  });

  // Wrap the Express server
  const ws = createServer(listener);

  server.installSubscriptionHandlers(ws);

  ws.listen(parseInt(process.env.PORT) || PORT, () => {
    console.log(`Apollo Server is now running on port ${parseInt(process.env.PORT) || PORT}`);
  });
}

main();
