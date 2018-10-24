import { injectable, inject, ModuleConfig } from '@graphql-modules/core';
import { WebhooksModuleConfig } from "@modules/webhooks";
import { ObjectID } from "bson";
import { PullRequestDbObject } from "../../../generated-models";
import { verifyId } from "@modules/webhooks/utills/verify-id";
import { PubSub } from 'apollo-server-express';

@injectable()
export class WebhooksProvider {
  pubsub = new PubSub();
  PR_ADDED = 'prAdded';
  PR_REVIEWED = 'prReviewed';

  constructor(
    @inject(ModuleConfig('webhooks')) private config: WebhooksModuleConfig,
  ) {
    config.expressApp.post('/klm', async (req, res) => {
      console.log('INCOMING KLM WEBHOOK');
      res.send({});

      if (req.body.pullrequest && req.body.pullrequest.title && req.body.pullrequest.links.html.href) {
        await this.addPr({
          project: "KLM",
          title: req.body.pullrequest.title,
          description: req.body.pullrequest.description,
          link: req.body.pullrequest.links.html.href,
          isReviewed: false,
          date: new Date(),
        });
      } else {
        console.error('The webhook is malformed:', JSON.stringify(req.body));
      }
    });

    config.expressApp.post('/schneider', async (req, res) => {
      console.log('INCOMING SCHNEIDER WEBHOOK');
      res.send({});

      if (req.body.resource && req.body.resource.title && req.body.resource._links.web.href) {
        await this.addPr({
          project: "SCHNEIDER",
          title: req.body.resource.title,
          description: req.body.resource.description,
          link: req.body.resource._links.web.href,
          isReviewed: false,
          date: new Date(),
        });
      } else {
        console.error('The webhook is malformed:', JSON.stringify(req.body));
      }
    });
  }

  async addPr(prPartial: Partial<PullRequestDbObject>): Promise<Partial<PullRequestDbObject>> {
    console.log('Saving PR to the database');
    const {insertedId} = await this.config.pullRequests.insertOne(prPartial);

    const pr = await this.getPr(insertedId);

    this.pubsub.publish(this.PR_ADDED, {
      [this.PR_ADDED]: pr,
    });

    return pr;
  }

  async getPrs(): Promise<Partial<PullRequestDbObject>[]> {
    return await this.config.pullRequests.find().sort({date: -1}).toArray();
  }

  async getPr(id: string | ObjectID): Promise<Partial<PullRequestDbObject>> {
    return await this.config.pullRequests.findOne({
      _id: verifyId(id),
    });
  }

  async reviewPr(id: string | ObjectID): Promise<Partial<PullRequestDbObject>> {
    let pr = await this.getPr(id);
    await this.config.pullRequests.updateOne({
      _id: verifyId(id),
    }, {
      $set: { isReviewed: !pr.isReviewed },
    });

    pr = await this.getPr(id);

    this.pubsub.publish(this.PR_REVIEWED, {
      [this.PR_REVIEWED]: pr,
    });

    return pr;
  }

  async updatePrComment(id: string | ObjectID, comment: String): Promise<Partial<PullRequestDbObject>> {
    await this.config.pullRequests.updateOne({
      _id: verifyId(id),
    }, {
      $set: { comment },
    });

    const pr = await this.getPr(id);

    this.pubsub.publish(this.PR_REVIEWED, {
      [this.PR_REVIEWED]: pr,
    });

    return pr;
  }
}