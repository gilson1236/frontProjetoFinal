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
    console.log(record._id)
    if(record._id){
      console.log("aqui1")
      return this.update(record)
    }
    return this.create(record);
  }

  private create(record: Partial<Apostador>) {
    return this.httpClient.post<Apostador>(this.API, record).pipe(first());
  }

  private update(record: Partial<Apostador>){
    console.log("aqui2")
    return this.httpClient.put<Apostador>(`${this.API}/${record._id}`, record).pipe(first())
  }

  loadById(id: string) {
    console.log("Fetching apostador with ID:", id); // Add this log
    return this.httpClient.get<Apostador>(`${this.API}/${id}`).pipe(first())
  }

  remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first())
  }

}
