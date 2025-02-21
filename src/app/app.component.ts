import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './ui/header/header.component';
import * as AOS from 'aos';
import { TimelineComponent } from './components/timeline/timeline.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, TimelineComponent, GalleryComponent, MensajesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'AppNerea';
  ngOnInit(): void {
    AOS.init();
  }
}
