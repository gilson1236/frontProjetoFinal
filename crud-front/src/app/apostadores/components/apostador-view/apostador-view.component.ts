import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Apostador } from '../../share/models/apostador';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppMaterialModule } from '../../share/app-material/app-material/app-material.module';
import { Location, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApostadorService } from '../../services/apostador.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PreviousRouteService } from '../../services/previous-route.service';
import { Telefone } from '../../share/models/telefone';
import { ConfirmationDialogComponent } from '../../share/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-apostador-view',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatSidenavModule, AppMaterialModule, NgIf, NgFor],
  templateUrl: './apostador-view.component.html',
  styleUrl: './apostador-view.component.scss'
})
export class ApostadorViewComponent implements OnInit{
  apostadores?: Apostador[];
  @Input() apostador?: Apostador;
  idParam: any
  numero = ''
  @Output() telefone?: Telefone;
  @Output() edit: EventEmitter<Apostador> = new EventEmitter(false)
  @Output() view: EventEmitter<Apostador> = new EventEmitter(false)
  @Output() remove: EventEmitter<Apostador> = new EventEmitter(false)

  constructor(private route: ActivatedRoute,
              private location: Location,
              private apostadorService: ApostadorService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private previousRouteService: PreviousRouteService
  ){
    //this.apostador = this.route.snapshot.data['apostador']
    /*this.apostador = {
      _id: '',
      nome: '', 
      endereco: '',
      telefone: {
        _id: '',
        number: ''
      }
    }*/
  }

  ngOnInit() {
    //this.apostador = this.route.snapshot.data['apostador'];
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('id');
      console.log("Retrieved ID from route params:", this.idParam); // Add this log
      if(this.idParam){
        this.apostadorService.loadById(this.idParam).subscribe(apostador => {
          this.apostador = apostador
          this.telefone = apostador.telefone
          this.numero = apostador.telefone.number
          console.log("Fetched Apostador:", this.apostador); // Add this log
          console.log(this.telefone)
        })
      } else {
        console.error("Id parameter is missing")
      }
    })    
    console.log(this.telefone)
  }

  onError(mensagem: string) {
    //this.dialog.open(data:mensagem)
  }

  private getUrlCustomized(){
    let urlGet = this.previousRouteService.getPreviousUrl()
    urlGet = urlGet.replace('view', 'edit')

    return urlGet
  }

  onEdit(record: Apostador){

    let url: string = this.getUrlCustomized()
    
    console.log(url)

    //const iden = this.route.snapshot.paramMap.get(record._id)

    //console.log(iden)
    
    //this.apostador = {
      //_id: record._id,
      //nome: record.nome, 
      //endereco: record.endereco,
      //telefone: {
        //_id: record.telefone._id,
        //number: record.telefone.number
      //}
    //}
    //console.log(this.apostador)
    //let registry = record
    //console.log(registry)

    /*if(record._id){
      this.router.navigate(['edit', record._id], { relativeTo: this.route})
    } else {
      console.error("Id é undefined")
    }*/

    console.log(url)
    this.router.navigateByUrl(url)
      //this.router.navigate(['edit', this.idParam], { relativeTo: this.route})
  }

  onRemove(record: Apostador){
    console.log("remover")
    console.log(this.apostador?._id)
    console.log(this.previousRouteService.getPreviousUrl())
    let id = this.getId()
    console.log(id)
    //this.remove.emit(record)
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza de que deseja remover este apostador?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.apostadorService.remove(id).subscribe({
          next: () => {
            this.router.navigate(['/'])
            this.snackBar.open('Apostador removido com sucesso', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: () => this.onError('Erro ao tentar remover o apostador!')
        });
      }
    });

  }

  private getId(){
    let id = this.previousRouteService.getPreviousUrl().replace('/apostadores/view/','')
    return id
  }

  onCancel(){
    this.location.back()
  }

}
