import { AppContext } from '@graphql-modules/core';
import { WebhooksProvider } from "@modules/webhooks/providers/webhooks.provider";
import { ReviewPrMutationArgs } from "../../../generated-models";

export default {
  Mutation: {
    reviewPr: async (root, {id}: ReviewPrMutationArgs, { injector }: AppContext) =>
      injector.get<WebhooksProvider>(WebhooksProvider).reviewPr(id),
  },
};
