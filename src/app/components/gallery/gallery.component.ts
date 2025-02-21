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
  
}
