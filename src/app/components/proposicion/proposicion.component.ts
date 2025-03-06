import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-proposicion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proposicion.component.html',
  styleUrl: './proposicion.component.css'
})
export class ProposicionComponent {
  posX = 0;
  posY = 0;

  moverBoton() {
    // Obtener el tamaño de la ventana
    const maxWidth = window.innerWidth - 100; // Ajusta el rango para que no se salga de la pantalla
    const maxHeight = window.innerHeight - 100;

    // Generar posiciones aleatorias dentro del rango
    this.posX = Math.floor(Math.random() * maxWidth) - (maxWidth / 2);
    this.posY = Math.floor(Math.random() * maxHeight) - (maxHeight / 2);
  }
  yesClick(){
    
  }
}
