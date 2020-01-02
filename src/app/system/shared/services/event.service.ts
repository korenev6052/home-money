import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UEvent } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable()

export class EventService {

  constructor(private http: HttpClient) {

  }

  addEvent(event: UEvent): Observable<UEvent> {
    return this.http.post<UEvent>('http://localhost:3000/events', event);
  }

  getEvents(): Observable<UEvent[]> {
    return this.http.get<UEvent[]>('http://localhost:3000/events');
  }

  getEventBuId(id: number): Observable<UEvent> {
    return this.http.get<UEvent>(`http://localhost:3000/events/${id}`);
  }

}