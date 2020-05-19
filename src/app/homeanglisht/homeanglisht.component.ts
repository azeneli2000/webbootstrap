import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  
import { GetDataService } from '../get-data.service';
import { database } from 'firebase';

@Component({
  selector: 'app-homeanglisht',
  templateUrl: './homeanglisht.component.html',
  styleUrls: ['./homeanglisht.component.css']
})
export class HomeanglishtComponent implements OnInit {

  projects : any = [];
  isShown:boolean=false;

  constructor(config: NgbCarouselConfig, private data : GetDataService) {
    config.interval = 5000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false;  
    config.wrap=true;
//project array
// this.projects.push({'src':'assets/carusel1.jpg','titulli':'asdfgadfgdfsgdfg','detaje':'ksdhflkjasdhflkjasdh sdigfsdkflgkshdflkjhgzdlkfjh dskjfghlkjsdfhglkjshdflhgdslfkjghlkdjfshglksdjf'});
// this.projects.push({'src':'assets/carusel1.jpg','titulli':'asdfgadfgdfsgdfg','detaje':'ksdhflkjasdhflkjasdh '});
// this.projects.push({'src':'assets/carusel1.jpg','titulli':'asdfgadfgdfsgdfg','detaje':'ksdhflkja '});
// this.projects.push({'src':'assets/carusel1.jpg','titulli':'asdfgadfgdfsgdfg','detaje':'ksdhflkjasdhflkjasdhdfgdsfg '});
// this.projects.push({'src':'assets/carusel1.jpg','titulli':'asdfgadfgdfsgdfg','detaje':'ksd '});
// this.projects.push({'src':'assets/carusel1.jpg','titulli':'asdfgadfgdfsgdfg','detaje':'ksdhflkjasdhflkjasdhdfgdsfg '});

}
  
 
  ngOnInit(): void {
   this.data.getDataShqip().subscribe((s)=>{ 
   this.projects = [];
    s.forEach(element => {
     console.log(  element.payload.val())
     this.projects.push({'src': element.payload.val()["imageUrl"],'titulli': element.payload.val()["titulli"],'detaje':element.payload.val()["detaje"]});

    });
    });
  }

}
