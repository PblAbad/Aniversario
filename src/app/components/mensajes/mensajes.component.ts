import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent implements OnInit{
  mensajeDiario: string = '';
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  private countdownInterval: any;
  mensajes: string[] = [
    "Tal",
    "Cual",
    "Pascual",
    "Eres el amor de mi vida",
    "rw",
    "dsf",
    "sf",
    "xc",
    "wewe",
    "qrqr",
    "adg",
    "hjfgd",
    "kgh",
    "ñloi",
    "pio",
    "gdf",
    "vbvb",
    "nmnmnm",
  ]

  ngOnInit(): void {
    this.setDailyMessage();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
  
  setDailyMessage(){
    const ultimoMensaje = localStorage.getItem("ultimoMensaje")
    const hoy = new Date().toDateString()

    if (!ultimoMensaje || ultimoMensaje !== hoy){
      localStorage.setItem("ultimoMensaje", hoy)
      this.mensajeDiario = this.randomMensaje()
    } else{
      this.mensajeDiario = localStorage.getItem("mensajeDiario") || this.mensajes[0]
    }
  }

  randomMensaje(){
    const randomIndex = Math.floor(Math.random() * this.mensajes.length)
    const mensaje = this.mensajes[randomIndex]
    localStorage.setItem("mensajeDiario", mensaje)
    return mensaje
  }

  startCountdown(): void{
    this.countdownInterval = setInterval(()=>{
      const now = new Date()
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate()+1)
      tomorrow.setHours(0,0,0,0);

      const timeDifference = tomorrow.getTime() - now.getTime();
      this.horas = Math.floor((timeDifference / (1000*60*60))%24);
      this.minutos = Math.floor((timeDifference / (1000*60))%60);
      this.segundos = Math.floor((timeDifference / (1000))%60);
    }, 1000)
  }
}
