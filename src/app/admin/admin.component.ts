import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { GetDataService } from '../get-data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  email ;
  isShown;
  uploadProgress: number = 0;
  currentProjectId: string = '';
  projects: any = [];

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  closeResult: string;
  modalData = {
    add: false,
    titulli: false,
    key: '',
    projektiShqipTitulli: '',
    projektiShqipDetaje: '',
    projektiAnglishtTitulli: '',
    projektiAnglishtDetaje: '',
    imageUrl: '',
  };


  //SETTINGS
   modelSetting  = []//= [{
//     key : '',
//     teksti:'',
//     tekstiAnglisht : ''
// }]
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

  constructor(
    private data: GetDataService,
    private storage: AngularFireStorage,
    private modalService: NgbModal,
    private router : Router,
    private auth : AuthService
  ) {}
 

  ngOnInit(): void {
    if(!this.auth.isLoggedIn)
     this.router.navigate(['/login']);
      
     this.email= localStorage.getItem('user');

    this.data.getDataShqip().subscribe((s) => {
      this.projects = [];
      s.forEach((element) => {
        this.projects.push({
          key: element.key,
          src: element.payload.val()['imageUrl'],
          titulli: element.payload.val()['titulli'],
          detaje: element.payload.val()['detaje'],
        });
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

  onFileSelected(event) {
    this.currentProjectId = event.target.id;
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
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.data.updateProjectImage(event.target.id, url);
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          //this.uploadProgress= task.percentageChanges();

          task.percentageChanges().subscribe((a) => (this.uploadProgress = a));
        }
      });
  }
  openModal(key, img, titulli) {
    this.modalData.titulli = titulli;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalData = this.modalData;
    this.modalData.key = key;
    this.modalData.projektiShqipTitulli = this.projects.find(
      (p) => p.key == key
    ).titulli;
    this.modalData.projektiShqipDetaje = this.projects.find(
      (p) => p.key == key
    ).detaje;
    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }

  openModalNew(titulli) {
    this.modalData.titulli = titulli;
    this.modalData.add = true;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalData = this.modalData;

    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }

  openModalConfirm(key) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.key = key;

    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }

  openModalSettings(setting,teksti,tekstiAnglisht) {
    const modalRef = this.modalService.open(SettingsModalComponent);
    modalRef.componentInstance.modalData = {
      key:setting,
    teksti:teksti,
    tekstiAnglisht :tekstiAnglisht
  }

    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }


  scrollTo(section) {
    document.querySelector('#' + section)
    .scrollIntoView();
    this.isShown=false;
  }
  logout(){
    this.auth.logout()
  }
  deleteProject(key) {
    this.data.deleteProject(key);
  }
}
