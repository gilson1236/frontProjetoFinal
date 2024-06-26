import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { ApostadorListComponent } from '../apostador-list/apostador-list.component';
import { ApostadorService } from '../../services/apostador.service';
import { ApostadorPage } from '../../share/models/apostador-page';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AppMaterialModule } from '../../share/app-material/app-material/app-material.module';
import { Apostador } from '../../share/models/apostador';

@Component({
  selector: 'app-apostador',
  standalone: true,
  imports: [
    AppMaterialModule, 
    MatCardModule, 
    MatButtonModule,
    MatPaginatorModule, 
    MatDividerModule, 
    ApostadorListComponent, 
    NgIf, 
    AsyncPipe
  ],
  templateUrl: './apostador.component.html',
  styleUrl: './apostador.component.scss'
})
export class ApostadorComponent implements OnInit{
  apostadores$: Observable<ApostadorPage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator


  ngAfterViewInit(){
    this.apostadores$?.subscribe(data => 
      console.log(data.totaElements)
    )
  }

  pageIndex = 0;
  pageSize = 10;
  totaElements = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apostadorService: ApostadorService){
      //this.totaElements = 0
      this.refresh()
  }

  ngOnInit(){
    //this.refresh()
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10}){
    this.apostadores$ = this.apostadorService
      .list(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
        this.pageIndex = pageEvent.pageIndex,
        this.pageSize = pageEvent.pageSize
      }),
      catchError(() => {
        
        return of({ apostadores: [], totaElements: 0, totalPages: 0});
      })
    );

  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onEdit(apostador: Apostador){
    console.log("Navigating to edit with ID:", apostador._id); // Add this log
    if(apostador._id){
      this.router.navigate(['edit', apostador._id], { relativeTo: this.route})
    } else {
      console.error("Id é undefined")
    }
  }

  onView(apostador: Apostador){
    console.log("Navigating to view with ID:", apostador._id); // Add this log
    if(apostador._id){
      this.router.navigate(['view', apostador._id], { relativeTo: this.route})
    } else {
      console.error("Id é undefined")
    }
  }

  onDraw(){
    console.log("sortear")
    this.router.navigate(['draw'], { relativeTo: this.route})
  }

}
