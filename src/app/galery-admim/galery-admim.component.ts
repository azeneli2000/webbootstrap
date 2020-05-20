import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { GetDataService } from '../get-data.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { disableDebugTools } from '@angular/platform-browser';


@Component({
  selector: 'app-galery-admim',
  templateUrl: './galery-admim.component.html',
  styleUrls: ['./galery-admim.component.css']
})
export class GaleryAdmimComponent implements OnInit {

  constructor(private _lightbox: Lightbox,private data:GetDataService,private storage: AngularFireStorage,
    private modalService: NgbModal) { }
  downloadURL: Observable<string>;
  uploadProgress: number = 0;
  currentImageId: string = '';
  fb;
  album:any = [];
  photo : {
    key : any
    src : ''
    caption : ''
    thumb : ''
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.album, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  ngOnInit(): void {
    let l =this.data.checkGalery().subscribe((a)=>{
      if(a.length==0)      
        this.data.addGAlleryEmpty();
       
     });

     this.data.checkGalery().subscribe((s)=>{
     this.album = [];
      s.forEach(element => {
            this.album.push({key:element.key,...element.payload.val() as {}})
            
      });
     })
  }
  openModalConfirm(key){}
  onFileSelected(event){
    this.currentImageId = event.target.id;
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
              console.log(url);
              this.data.updateGallery(event.target.id, url);
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

}
