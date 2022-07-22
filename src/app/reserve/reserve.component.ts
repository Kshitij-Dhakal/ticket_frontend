import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Show } from '../shows/shows';
import { ShowsService } from '../shows/shows.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Card } from './card';
import { Ticket } from './ticket';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  showId?: number;
  show?: Show;
  requestModel = new FormGroup({
    'number': new FormControl(''),
    'owner': new FormControl('',),
    'expiry': new FormControl(''),
    'cvv': new FormControl('')
  })
  error?: string;
  msg?: string;
  submittingForm: boolean = false;
  reserved: boolean = false;
  reservedCount = 0;


  constructor(private route: ActivatedRoute,
    private showService: ShowsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.showId = params['show'];
      this.showService.getShowById(this.showId)
        .subscribe((next) => {
          this.show = next;
          this.reservedCount = this.show.reserved ?? this.reservedCount
        });
    });
  }


  onSubmit() {
    if (!this.submittingForm) {
      const card: Card = {
        owner: this.requestModel.value.owner ?? '',
        cardNumber: this.requestModel.value.number ?? '',
        expiry: +(this.requestModel.value.expiry ?? 0),
        cvv: +(this.requestModel.value.cvv ?? 0)
      }
      const ticket: Ticket = {
        show: this.show
      }
      if (this.requestModel.valid) {
        this.submittingForm = true;
        //submit to service
        this.showService
          .reserveTicket({ card: card, ticket: ticket })
          .subscribe({
            next: (v) => {
              this.reservedCount++;
              this.reserved = true;
            }
          })
      }
    }
    this.submittingForm = false;
  }
}
