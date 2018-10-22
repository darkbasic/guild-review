import { Component, OnInit } from '@angular/core';
import { PrListerApolloService } from '../../services/pr-lister-apollo.service';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.scss']
})
export class PrListComponent implements OnInit {
  prs$ = this.prListerApolloService.getPrs$();

  constructor(private prListerApolloService: PrListerApolloService) {}

  ngOnInit() {}

  reviewPr({ option: { value: pr, selected } }: any) {
    this.prListerApolloService.reviewPr$(pr, selected).subscribe();
  }
}
