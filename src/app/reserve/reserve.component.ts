import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Show } from '../shows/shows';
import { ShowsService } from '../shows/shows.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  showId?: number;
  show?: Show;

  constructor(private route: ActivatedRoute,
    private showService: ShowsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
       this.showId = params['show'];
       this.showService.getShowById(this.showId)
       .subscribe((next) => {
        this.show = next;
        console.log(this.show)
       });
    });
  }

}
