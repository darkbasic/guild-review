/* tslint:disable */
import { ObjectID } from "mongodb";

export interface AdditionalEntityFields {
  path?: string | null;
  type?: string | null;
}
export interface PullRequestQueryArgs {
  id: string;
}

export interface PullRequestDbObject {
  _id: ObjectID;
  title: string;
  description: string;
  link: string;
  isReviewed: boolean;
}

export interface PullRequest {
  id: string;
  title: string;
  description: string;
  link: string;
  isReviewed: boolean;
}
export interface ReviewPrMutationArgs {
  id: string;
}
