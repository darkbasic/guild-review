/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

export interface Query {
  pullRequests: PullRequest[];
  pullRequest?: PullRequest | null;
}

export interface PullRequest {
  id: string;
  project: string;
  title: string;
  description?: string | null;
  link: string;
  isReviewed: boolean;
}

export interface Mutation {
  reviewPr: PullRequest;
}

export interface Subscription {
  prAdded?: PullRequest | null;
  prReviewed?: PullRequest | null;
}
/** Inputs */
export interface AdditionalEntityFields {
  path?: string | null;
  type?: string | null;
}
export interface PullRequestQueryArgs {
  id: string;
}
export interface ReviewPrMutationArgs {
  id: string;
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    pullRequests?: PullRequestsResolver<PullRequest[], any, Context>;
    pullRequest?: PullRequestResolver<PullRequest | null, any, Context>;
  }

  export type PullRequestsResolver<
    R = PullRequest[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PullRequestResolver<
    R = PullRequest | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, PullRequestArgs>;
  export interface PullRequestArgs {
    id: string;
  }
}

export namespace PullRequestResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    project?: ProjectResolver<string, any, Context>;
    title?: TitleResolver<string, any, Context>;
    description?: DescriptionResolver<string | null, any, Context>;
    link?: LinkResolver<string, any, Context>;
    isReviewed?: IsReviewedResolver<boolean, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ProjectResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TitleResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DescriptionResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type LinkResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type IsReviewedResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    reviewPr?: ReviewPrResolver<PullRequest, any, Context>;
  }

  export type ReviewPrResolver<
    R = PullRequest,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ReviewPrArgs>;
  export interface ReviewPrArgs {
    id: string;
  }
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = any> {
    prAdded?: PrAddedResolver<PullRequest | null, any, Context>;
    prReviewed?: PrReviewedResolver<PullRequest | null, any, Context>;
  }

  export type PrAddedResolver<
    R = PullRequest | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PrReviewedResolver<
    R = PullRequest | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PrAdded {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    prAdded?: PrAdded | null;
  };

  export type PrAdded = {
    __typename?: "PullRequest";
    id: string;
    project: string;
    title: string;
    description?: string | null;
    link: string;
    isReviewed: boolean;
  };
}

export namespace PrReviewed {
  export type Variables = {};

  export type Subscription = {
    __typename?: "Subscription";
    prReviewed?: PrReviewed | null;
  };

  export type PrReviewed = {
    __typename?: "PullRequest";
    id: string;
    project: string;
    title: string;
    description?: string | null;
    link: string;
    isReviewed: boolean;
  };
}

export namespace PullRequests {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    pullRequests: PullRequests[];
  };

  export type PullRequests = {
    __typename?: "PullRequest";
    id: string;
    project: string;
    title: string;
    description?: string | null;
    link: string;
    isReviewed: boolean;
  };
}

export namespace ReviewPr {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";
    reviewPr: ReviewPr;
  };

  export type ReviewPr = {
    __typename?: "PullRequest";
    id: string;
    project: string;
    title: string;
    description?: string | null;
    link: string;
    isReviewed: boolean;
  };
}

import { Injectable } from "@angular/core";

import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class PrAddedGQL extends Apollo.Subscription<
  PrAdded.Subscription,
  PrAdded.Variables
> {
  document: any = gql`
    subscription prAdded {
      prAdded {
        id
        project
        title
        description
        link
        isReviewed
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class PrReviewedGQL extends Apollo.Subscription<
  PrReviewed.Subscription,
  PrReviewed.Variables
> {
  document: any = gql`
    subscription prReviewed {
      prReviewed {
        id
        project
        title
        description
        link
        isReviewed
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class PullRequestsGQL extends Apollo.Query<
  PullRequests.Query,
  PullRequests.Variables
> {
  document: any = gql`
    query pullRequests {
      pullRequests {
        id
        project
        title
        description
        link
        isReviewed
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class ReviewPrGQL extends Apollo.Mutation<
  ReviewPr.Mutation,
  ReviewPr.Variables
> {
  document: any = gql`
    mutation reviewPr($id: ID!) {
      reviewPr(id: $id) {
        id
        project
        title
        description
        link
        isReviewed
      }
    }
  `;
}
