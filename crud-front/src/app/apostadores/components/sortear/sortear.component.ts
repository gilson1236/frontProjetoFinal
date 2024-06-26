import { NgIf, Location } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApostadorService } from '../../services/apostador.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sortear',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './sortear.component.html',
  styleUrl: './sortear.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortearComponent implements OnInit{

  registroSorteado: string
  audio = new Audio('../assets/audio/audioSorteio.mp3')
  sorteado = false  

  ngOnInit(){
  }

  constructor(private apostadorService: ApostadorService,
    private location: Location
  ){
    this.audio.play()
    this.registroSorteado = ''
  }

  sortear(): string{
    this.apostadorService.draw()
      .subscribe(sorteado => {
        this.registroSorteado = "Quem ganhou foi " + sorteado.nome;
      })
    this.audio.pause()
      this.sorteado = true

    return this.registroSorteado
  }

  voltar(){
    this.audio.pause()
    this.location.back()
  }
}