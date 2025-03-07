import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { register as registerSwiperElements} from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
registerSwiperElements();

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GalleryComponent {
  images = [
    'barco.jpg',
    'cafeteria.jpg',
    'corazon.jpg',
    'alle.jpeg',
    'arbol.jpeg',
    'arbol2.jpeg',
    'ascen.jpeg',
    'ascensor.jpeg',
    'beetle.jpeg',
    'besito.jpeg',
    'besohotel.jpeg',
    'boda.jpeg',
    'bubble.jpeg',
    'caida.jpeg',
    'camp.jpeg',
    'coctel.jpeg',
    'cora.jpeg',
    'dinos.jpeg',
    'donette.jpeg',
    'duki.jpeg',
    'espejito.jpeg',
    'espejo.jpg',
    'filip.jpeg',
    'fitge.jpeg',
    'fotomaton.jpeg',
    'gafas.jpeg',
    'gafas2.jpeg',
    'gin.jpeg',
    'gin2.jpeg',
    'hotel.jpeg',
    'manos.jpeg',
    'masca.jpeg',
    'nose.jpeg',
    'pisci.jpeg',
    'playa.jpeg',
    'playaplaya.jpeg',
    'primor.jpeg',
    'ropa.jpeg',
    'rosas.jpeg',
    'tontos.jpeg',
    'verde.jpeg',
    'vicenta.jpeg'
  ];
}
