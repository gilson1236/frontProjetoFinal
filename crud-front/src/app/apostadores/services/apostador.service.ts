import { Injectable } from '@angular/core';
import { Apostador } from '../share/models/apostador';
import { HttpClient } from '@angular/common/http';
import { ApostadorPage } from '../share/models/apostador-page';
import { first, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApostadorService {

  private readonly API = 'api/v1/aposta'

  cache: Apostador[] = []

  constructor(private httpClient: HttpClient) { }

  list(page = 0, size = 10) {
    return this.httpClient.get<ApostadorPage>(this.API, { params: { page, size} })
    .pipe(
      first(),
      tap(data => this.cache = data.apostadores)
    )
  }

  save(record: Partial<Apostador>) {
    return this.create(record);
  }

  private create(record: Partial<Apostador>) {
    return this.httpClient.post<Apostador>(this.API, record).pipe(first());
  }

  loadById(id: string) {
    return this.httpClient.get<Apostador>(`${this.API}/${id}`).pipe(first())
  }
}
