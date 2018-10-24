import { Injectable } from '@angular/core';
import {
  PrAddedGQL,
  PrReviewedGQL,
  PullRequests,
  PullRequestsGQL,
  ReviewPr,
  ReviewPrGQL,
  UpdatePrComment,
  UpdatePrCommentGQL
} from '../../types';
import { pluck } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';

@Injectable({
  providedIn: 'root'
})
export class PrListerApolloService {

  constructor(
    private pullRequestsGQL: PullRequestsGQL,
    private reviewPrGQL: ReviewPrGQL,
    private updatePrCommentGQL: UpdatePrCommentGQL,
    private prAddedGQL: PrAddedGQL,
    private prReviewedGQL: PrReviewedGQL,
  ) {}

  getPrs$(): Observable<PullRequests.PullRequests> {
    const prsWq = this.pullRequestsGQL.watch();

    prsWq.subscribeToMore({
      document: this.prAddedGQL.document,
      updateQuery: (prev: PullRequests.Query, { subscriptionData }: any) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newPr = subscriptionData.data.prAdded;

        return Object.assign({}, prev, {
          pullRequests: [newPr, ...prev.pullRequests],
        });
      }
    });

    prsWq.subscribeToMore({
      document: this.prReviewedGQL.document,
      updateQuery: (prev: PullRequests.Query, { subscriptionData }: any) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const reviewedPr = subscriptionData.data.prReviewed;

        return Object.assign({}, prev, {
          pullRequests: prev.pullRequests.map(pullRequest => pullRequest.id === reviewedPr.id ? {...reviewedPr} : pullRequest),
        });
      }
    });

    return prsWq.valueChanges.pipe(
      pluck<ApolloQueryResult<PullRequests.Query>, PullRequests.PullRequests>('data', 'pullRequests'),
    );
  }

  reviewPr$(pr: PullRequests.PullRequests, isReviewed: boolean): Observable<FetchResult<ReviewPr.Mutation>> {
    return this.reviewPrGQL.mutate({id: pr.id}, {
      optimisticResponse: {
        __typename: 'Mutation',
        reviewPr: {
          id: pr.id,
          __typename: 'PullRequest',
          title: pr.title,
          description: pr.description,
          link: pr.link,
          date: pr.date,
          project: pr.project,
          comment: pr.comment,
          isReviewed,
        },
      },
      update: (store, { data: { reviewPr } }: {data: ReviewPr.Mutation}) => {
        {
          // Read the data from our cache for this query.
          const data = store.readQuery<PullRequests.Query, PullRequests.Variables>({
            query: this.pullRequestsGQL.document,
          });
          // Write our data back to the cache.
          store.writeQuery({
            query: this.pullRequestsGQL.document,
            data: Object.assign({}, data, {
              pullRequests: data.pullRequests.map(pullRequest => pullRequest.id === pr.id ? {...reviewPr} : pullRequest),
            }),
          });
        }
      }
    });
  }

  updatePrComment$(pr: PullRequests.PullRequests, comment: string): Observable<FetchResult<UpdatePrComment.Mutation>> {
    return this.updatePrCommentGQL.mutate({id: pr.id, comment}, {
      optimisticResponse: {
        __typename: 'Mutation',
        updatePrComment: {
          id: pr.id,
          __typename: 'PullRequest',
          title: pr.title,
          description: pr.description,
          link: pr.link,
          date: pr.date,
          project: pr.project,
          comment,
          isReviewed: pr.isReviewed,
        },
      },
      update: (store, { data: { updatePrComment } }: {data: UpdatePrComment.Mutation}) => {
        {
          // Read the data from our cache for this query.
          const data = store.readQuery<PullRequests.Query, PullRequests.Variables>({
            query: this.pullRequestsGQL.document,
          });
          // Write our data back to the cache.
          store.writeQuery({
            query: this.pullRequestsGQL.document,
            data: Object.assign({}, data, {
              pullRequests: data.pullRequests.map(pullRequest => pullRequest.id === pr.id ? {...updatePrComment} : pullRequest),
            }),
          });
        }
      }
    });
  }
}
