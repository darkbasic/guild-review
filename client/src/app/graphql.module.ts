import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getMainDefinition} from 'apollo-utilities';
import {OperationDefinitionNode} from 'graphql';
import {split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import { environment } from "../environments/environment";

const uri = environment.APIEndpoint;
export function createApollo(httpLink: HttpLink) {
  const subscriptionLink = new WebSocketLink({
    uri: uri.replace('http', 'ws'),
    options: {
      reconnect: true,
    }
  });
  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    subscriptionLink,
    httpLink.create({uri})
  );

  return {
    link,
    cache: new InMemoryCache(),
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
export class GraphQLModule {}
