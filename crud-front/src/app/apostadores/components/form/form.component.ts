import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../share/app-material/app-material/app-material.module';
import { Apostador } from '../../share/models/apostador';
import { ActivatedRoute, Router } from '@angular/router';
import { ApostadorService } from '../../services/apostador.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    AppMaterialModule, 
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  host: {ngSkipHydratation: 'true'},
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private apostadorService: ApostadorService,
    private snackBar: MatSnackBar,
    private location: Location
  ){
    this.form = new FormGroup({
      _id: new FormControl(''),
      nome: new FormControl(''),
      endereco: new FormControl(''),
      telefone: new FormControl('')
    });
  }

  ngOnInit(): void {
    const apostador: Apostador = this.route.snapshot.data['apostador'];
    console.log(apostador)
    console.log(this.router.url)
    let url = this.router.url
    if(url.includes('/edit')){
      apostador._id = url.replace('/apostadores/edit/','')
      console.log(apostador._id)
    }
    console.log(apostador._id)
    if(apostador){
      this.form = this.formBuilder.group({
        _id: [apostador._id],
        nome: [apostador.nome, [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]],
        endereco: [apostador.endereco, [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200)
        ]],
        telefone: [apostador.telefone?.number, [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(12)
        ]]
      });
    } 
  }

  onSubmit() {
    if(this.form.valid){
      console.log(this.form.value)
      console.log(this.route.url)
      this.apostadorService.save(this.form.value)
        .subscribe({next: () => this.onSuccess(),
          error: () => this.onError()
        })
    }
  }
  private onError() {
    alert("Erro ao salvar o apostador!");
  }
  private onSuccess() {
    this.snackBar.open('Apostador salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  onCancel() { 
    this.location.back();
  }
}
