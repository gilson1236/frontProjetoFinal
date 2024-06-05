import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ApostadorService } from '../services/apostador.service';
import { Apostador } from '../share/models/apostador';

@Injectable({
  providedIn: 'root'
})
export class ApostadorResolver {
  constructor(private service: ApostadorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Apostador> {
    if (route.params && route.params['id']) {
      console.log('entrou aqui')
      return this.service.loadById(route.params['id']);
    }
    console.log('entrou aqui')
    return of({ _id: '', nome: '', endereco: '', telefone: { _id: '', number: ''} });
  }
}