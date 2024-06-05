import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Apostador } from '../../share/models/apostador';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ApostadorService } from '../../services/apostador.service';
import { AppMaterialModule } from '../../share/app-material/app-material/app-material.module';

@Component({
  selector: 'app-apostador-list',
  standalone: true,
  imports: [MatTableModule, AppMaterialModule],
  templateUrl: './apostador-list.component.html',
  styleUrl: './apostador-list.component.scss'
})
export class ApostadorListComponent implements OnInit{
  
  readonly displayedColumns = ['nome', 'endereco', 'telefone']

  @Input() apostadores: Apostador[] = [] 

  dataSource = new MatTableDataSource<Apostador>(this.apostadores)

  @Output() add = new EventEmitter(false)
  @Output() edit: EventEmitter<Apostador> = new EventEmitter(false)
  //@Output() remove = new EventEmitter(false)

  constructor(private route: ActivatedRoute,
              private apostadorService: ApostadorService
  ) {}

  ngOnInit(): void {
    //this.getApostadores()
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(apostador: Apostador){
    this.edit.emit(apostador);
  }

}