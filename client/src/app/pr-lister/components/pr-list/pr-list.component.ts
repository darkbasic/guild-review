import { Component, OnInit } from '@angular/core';
import { PrListerApolloService } from '../../services/pr-lister-apollo.service';
import { PullRequests } from "../../../types";

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.scss']
})
export class PrListComponent implements OnInit {
  prs$ = this.prListerApolloService.getPrs$();

  constructor(private prListerApolloService: PrListerApolloService) {}

  ngOnInit() {}

  reviewPr(pr: PullRequests.PullRequests, isReviewed: boolean) {
    this.prListerApolloService.reviewPr$(pr, isReviewed).subscribe();
  }

  updatePrComment(pr: PullRequests.PullRequests, comment: string) {
    if (comment !== pr.comment) {
      this.prListerApolloService.updatePrComment$(pr, comment).subscribe();
    }
  }
}
