import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Show } from '../shows/shows';
import { ShowsService } from '../shows/shows.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Card } from './card';
import { Ticket } from './ticket';
import { ReservedSeats } from './reserved-seats';

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
  reservedSeats = new Map<number, boolean>();
  newRervations = new Map<number, boolean>();
  reservedCount: number = 0;

  constructor(private route: ActivatedRoute,
    private showService: ShowsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.showId = params['show'];
      this.showService.getShowById(this.showId)
        .subscribe((next) => {
          this.show = next;
          this.show.reservedSeats?.forEach((it) => {
            this.reservedSeats.set(it.seat!, true);
            this.reservedCount++;
          })
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
        show: this.show,
      }
      const newReservations: ReservedSeats[] = []
      for (const it of this.newRervations) {
        if (it[1]) {
          newReservations.push({ seat: +it[0] })
        }
      };
      if(newReservations.length==0) {
        this.error = 'Add new reservations.';
      }
      if (this.requestModel.valid) {
        this.submittingForm = true;
        //submit to service
        this.showService
          .reserveTicket({ card: card, ticket: ticket, reservedSeats: newReservations })
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

  isBooked(i: number, j: number, row: string): boolean {
    return this.reservedSeats.get(this.getSeatNumber(i, j)) ?? false;
  }

  private getSeatNumber(i: number, j: number) {
    return i * 10 + j;
  }

  isNewReservation(i: number, j: number): boolean {
    return this.newRervations.get(this.getSeatNumber(i, j)) ?? false;
  }

  selectSeat(i: number, j: number) {
    const sn = this.getSeatNumber(i, j);
    if (!this.reservedSeats.has(sn)) {
      const isReserved = this.newRervations.get(sn) ?? false;
      this.newRervations.set(this.getSeatNumber(i, j), !isReserved);
    }
  }
}
