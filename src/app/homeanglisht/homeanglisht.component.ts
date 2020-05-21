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
  activeMenu;
  constructor(config: NgbCarouselConfig, private data : GetDataService) {
    config.interval = 5000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false;  
    config.wrap=true;


}
currentSection = 'section1';

about  :{ } ;
aboutAnglisht
certifikime ;
certifikimeAnglisht
licensat ;
licensatAnglisht
partneret ;
partneretAnglisht
profili ;
profiliAnglisht;
  ngOnInit(): void {
   this.data.getDataShqip().subscribe((s)=>{ 
   this.projects = [];
    s.forEach(element => {
     this.projects.push({'src': element.payload.val()["imageUrl"],'titulli': element.payload.val()["titulli"],'detaje':element.payload.val()["detaje"]});

    });
    });


    this.data.getSettings().subscribe((s)=>{

      this.about = s.find((s)=>s.key=="about").payload.val()['teksti'];
      this.aboutAnglisht = s.find((s)=>s.key=="about").payload.val()['tekstiAnglisht'];
   
      this.certifikime = s.find((s)=>s.key=="certifikime").payload.val()['teksti'];
      this.certifikimeAnglisht = s.find((s)=>s.key=="certifikime").payload.val()['tekstiAnglisht'];
   
      this.licensat = s.find((s)=>s.key=="licensat").payload.val()['teksti'];
      this.licensatAnglisht = s.find((s)=>s.key=="licensat").payload.val()['tekstiAnglisht'];
   
      this.profili = s.find((s)=>s.key=="profili").payload.val()['teksti'];
      this.profiliAnglisht = s.find((s)=>s.key=="profili").payload.val()['tekstiAnglisht'];
     
      this.partneret = s.find((s)=>s.key=="partneret").payload.val()['teksti'];
      this.partneretAnglisht = s.find((s)=>s.key=="partneret").payload.val()['tekstiAnglisht'];
   
       })
  }



  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  scrollTo(section) {
    document.querySelector('#' + section)
    .scrollIntoView();
    this.isShown=false;
  }



}
