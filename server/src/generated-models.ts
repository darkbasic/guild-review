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
  project: string;
  title: string;
  description: string | null;
  link: string;
  isReviewed: boolean;
}

export interface PullRequest {
  id: string;
  project: string;
  title: string;
  description?: string | null;
  link: string;
  isReviewed: boolean;
}
export interface ReviewPrMutationArgs {
  id: string;
}
