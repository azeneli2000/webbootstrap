import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private _lightbox: Lightbox) { 
    this.album.push({'src':'assets/carusel1.jpg','caption':'','thumb':'assets/carusel1.jpg'});
    this.album.push({'src':'assets/carusel2.jpg','caption':'','thumb':'assets/carusel2.jpg'});

    this.album.push({'src':'assets/carusel1.jpg','caption':'','thumb':'assets/carusel1.jpg'});
    this.album.push({'src':'assets/carusel1.jpg','caption':'','thumb':'assets/carusel1.jpg'});
    this.album.push({'src':'assets/carusel1.jpg','caption':'','thumb':'assets/carusel1.jpg'});


  }
  album:any = [];


  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.album, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  ngOnInit(): void {
  }

}
