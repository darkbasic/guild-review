import { PullRequestDbObject } from "../../../generated-models";
import { stringId } from "@modules/webhooks/utills/string-id";

export default {
  PullRequest: {
    id: (pullRequest: PullRequestDbObject) => stringId(pullRequest._id),
  },
};
