import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.init();
    }, 500); 
  }
}
