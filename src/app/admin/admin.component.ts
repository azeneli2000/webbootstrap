import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";

import { GetDataService } from '../get-data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  projects : any = [];
 
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  closeResult: string;
  modalData = { 
    add : false,
    titulli :false,
    key:'',
    projektiShqipTitulli:'',
    projektiShqipDetaje:'',
    projektiAnglishtTitulli:'' ,
    projektiAnglishtDetaje :'',
    imageUrl  : ''
  }
  constructor(private data: GetDataService, private storage: AngularFireStorage,private modalService : NgbModal) { }


  ngOnInit(): void {
    this.data.getDataShqip().subscribe((s)=>{ 
      this.projects = [];
       s.forEach(element => {
        console.log(  element.payload.val())
        this.projects.push({'key':element.key,'src': element.payload.val()["imageUrl"],'titulli': element.payload.val()["titulli"],'detaje':element.payload.val()["detaje"]});
   
       });
       });
     }
  



  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              console.log(url);
             this.data.updateProjectImage(event.target.id,url)


            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
         

          console.log('loading');

        }

      });
     
  }
  openModal(key,img,titulli) {
    this.modalData.titulli=titulli;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalData = this.modalData;
    this.modalData.key = key;
    this.modalData.projektiShqipTitulli =this.projects.find((p)=>p.key==key).titulli;
    this.modalData.projektiShqipDetaje =this.projects.find((p)=>p.key==key).detaje;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
   
  }

  openModalNew(titulli) {
    this.modalData.titulli= titulli;
    this.modalData.add = true;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalData = this.modalData;
 

    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
   
  }



}
