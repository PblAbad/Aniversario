import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-musica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './musica.component.html',
  styleUrl: './musica.component.css'
})
export class MusicaComponent implements OnInit {
  songs = [
    {
      title: 'Just Pretend',
      artist: 'Malos Presagios',
      cover: '/assets/images/justpretend.png',
      file: '/assets/audio/justPretend.mp3',
    },
    {
      title: 'Canción 2',
      artist: 'Artista 2',
      cover: '/assets/images/portada2.jpg',
      file: '/assets/music/cancion2.mp3',
    },
    {
      title: 'Canción 3',
      artist: 'Artista 3',
      cover: '/assets/images/portada3.jpg',
      file: '/assets/music/cancion3.mp3',
    },
    {
      title: 'Canción 1',
      artist: 'Artista 1',
      cover: '/assets/images/portada1.jpg',
      file: '/assets/audio/justPretend.mp3',
    },
    {
      title: 'Canción 2',
      artist: 'Artista 2',
      cover: '/assets/images/portada2.jpg',
      file: '/assets/music/cancion2.mp3',
    },
    {
      title: 'Just Pretend',
      artist: 'Malos Presagios',
      cover: '/assets/images/justpretend.png',
      file: '/assets/audio/justPretend.mp3',
    },
    {
      title: 'Canción 2',
      artist: 'Artista 2',
      cover: '/assets/images/portada2.jpg',
      file: '/assets/music/cancion2.mp3',
    },
    {
      title: 'Canción 3',
      artist: 'Artista 3',
      cover: '/assets/images/portada3.jpg',
      file: '/assets/music/cancion3.mp3',
    },
    {
      title: 'Canción 1',
      artist: 'Artista 1',
      cover: '/assets/images/portada1.jpg',
      file: '/assets/audio/justPretend.mp3',
    },
    {
      title: 'Canción 2',
      artist: 'Artista 2',
      cover: '/assets/images/portada2.jpg',
      file: '/assets/music/cancion2.mp3',
    },
  ];

  currentSongIndex: number = 0;
  currentSong: any = this.songs[0];
  audioPlayer: HTMLAudioElement = new Audio();
  isPlaying: boolean = false;

  ngOnInit(): void {
    this.loadSong();
  }

  loadSong(): void {
    this.audioPlayer.src = this.currentSong.file;
    this.audioPlayer.load();
  }

  playSong(index: number): void {
    this.currentSongIndex = index;
    this.currentSong = this.songs[index];
    this.loadSong();
    this.playPause();
  }

  playPause(): void {
    if (this.audioPlayer.paused) {
      this.audioPlayer.play();
      this.isPlaying = true;
    } else {
      this.audioPlayer.pause();
      this.isPlaying = false;
    }
  }
  
  nextSong(): void {
    this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
    this.currentSong = this.songs[this.currentSongIndex];
    this.loadSong();
    if (this.isPlaying) {
      this.audioPlayer.play();
    }
  }

  previousSong(): void {
    this.currentSongIndex =
      (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
    this.currentSong = this.songs[this.currentSongIndex];
    this.loadSong();
    if (this.isPlaying) {
      this.audioPlayer.play();
    }
  }
}