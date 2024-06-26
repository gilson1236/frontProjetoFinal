import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Apostador } from '../../share/models/apostador';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApostadorService } from '../../services/apostador.service';
import { AppMaterialModule } from '../../share/app-material/app-material/app-material.module';
import { MatIconModule } from '@angular/material/icon';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-apostador-list',
  standalone: true,
  imports: [MatTableModule, AppMaterialModule, MatTableModule, MatIconModule],
  templateUrl: './apostador-list.component.html',
  styleUrl: './apostador-list.component.scss'
})
export class ApostadorListComponent implements OnInit{
  
  readonly displayedColumns = ['nome', 'endereco', 'telefone', 'actions']

  @Input() apostadores: Apostador[] = [] 
  @Output() apostador?: Apostador

  dataSource = new MatTableDataSource<Apostador>(this.apostadores)

  @Output() add = new EventEmitter(false)
  @Output() edit: EventEmitter<Apostador> = new EventEmitter(false)
  @Output() view: EventEmitter<Apostador> = new EventEmitter(false)
  @Output() remove: EventEmitter<Apostador> = new EventEmitter(false)
  @Output() draw = new EventEmitter(false)

  constructor(private route: ActivatedRoute,
              private apostadorService: ApostadorService,
              private router: Router
  ) {}

  ngOnInit(): void {
    //this.getApostadores()
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(apostador: Apostador){
    console.log("aditar")
    console.log("Edit Apostador:", apostador); // Add this log
    this.edit.emit(apostador);
    
  }

  onView(apostador: Apostador){
    console.log(apostador.nome)
    console.log(apostador)
    console.log("View Apostador:", apostador); // Add this log
    this.view.emit(apostador)
    //this.router.navigate(['/view', apostador._id])
  }

  onRemove(apostador: Apostador) {
    this.remove.emit(apostador)
  }

  onDraw(){
    this.draw.emit(true)   
  }

}