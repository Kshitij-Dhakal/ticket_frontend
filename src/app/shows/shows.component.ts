import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Show } from './shows';
import { ShowsService } from './shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {
  shows: Show[] = [];
  loading: boolean = true;
  error?: String

  constructor(private showsService: ShowsService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows() {
    this.showsService.loadShows()
      .subscribe({
        next: (v) => {
          this.shows = v;
          this.loading = false;
        },
        error: (e) => {
          this.loading = false;
          this.error = e;
        }
      });
  }

  reserveTicket(id: number) {
    this.router.navigate(['/reserve', id])
  }
}
