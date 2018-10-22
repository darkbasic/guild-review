import { AppContext } from '@graphql-modules/core';
import { WebhooksProvider } from "@modules/webhooks/providers/webhooks.provider";
import { PullRequestQueryArgs } from "../../../generated-models";

export default {
  Query: {
    pullRequests: async (root, args, { injector }: AppContext) =>
      injector.get<WebhooksProvider>(WebhooksProvider).getPrs(),
    pullRequest: async (root, {id}: PullRequestQueryArgs, { injector }: AppContext) =>
      injector.get<WebhooksProvider>(WebhooksProvider).getPr(id),
  },
};
