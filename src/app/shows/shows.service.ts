import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Show } from './shows';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { ReserveRequest } from '../reserve/reserve-request';
import { Ticket } from '../reserve/ticket';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  reserveTicket(reserveRequest: ReserveRequest): Observable<Ticket> {
    return this.http.post<Ticket>(`${environment.apiURL}/api/ticket`, reserveRequest);
  }
  getShowById(showId: number | undefined): Observable<Show> {
    return this.http.get<Show>(`${environment.apiURL}/api/show/${showId}`);
  }
  loadShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${environment.apiURL}/api/shows`);
  }

  constructor(private http: HttpClient) { }
}
