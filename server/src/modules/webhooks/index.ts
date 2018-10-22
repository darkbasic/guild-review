import { GraphQLModule } from '@graphql-modules/core';
import { loadResolversFiles, loadSchemaFiles } from '@graphql-modules/sonar';
import { mergeGraphQLSchemas, mergeResolvers } from '@graphql-modules/epoxy';
import { Express } from 'express';
import { WebhooksProvider } from "./providers/webhooks.provider";
import { Collection } from "mongodb";
import { PullRequestDbObject } from "../../generated-models";

export interface WebhooksModuleConfig {
  pullRequests: Collection<Partial<PullRequestDbObject>>;
  serverUrl: string;
  expressApp: Express;
}

export const webhooksModule = new GraphQLModule<WebhooksModuleConfig>({
  name: 'webhooks',
  providers: [
    WebhooksProvider,
  ],
  typeDefs: mergeGraphQLSchemas(loadSchemaFiles(__dirname + '/schema/')),
  resolvers: mergeResolvers(loadResolversFiles(__dirname + '/resolvers/')),
});