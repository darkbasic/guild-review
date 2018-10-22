import { AppContext } from '@graphql-modules/core';
import { WebhooksProvider } from "@modules/webhooks/providers/webhooks.provider";

export default {
  Subscription: {
    prAdded: {
      subscribe: async (root, args, {injector}: AppContext) => {
        const webhooksProvider = injector.get<WebhooksProvider>(WebhooksProvider);
        return webhooksProvider.pubsub.asyncIterator([webhooksProvider.PR_ADDED]);
      },
    },
    prReviewed: {
      subscribe: async (root, args, {injector}: AppContext) => {
        const webhooksProvider = injector.get<WebhooksProvider>(WebhooksProvider);
        return webhooksProvider.pubsub.asyncIterator([webhooksProvider.PR_REVIEWED]);
      },
    },
  }
};
