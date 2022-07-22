import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Show } from './shows';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  getShowById(showId: number | undefined): Observable<Show> {
    return this.http.get<Show>(`${environment.apiURL}/api/show/${showId}`);
  }
  loadShows() :Observable<Show[]>{
    return this.http.get<Show[]>(`${environment.apiURL}/api/shows`);
  }

  constructor(private http: HttpClient) { }
}
