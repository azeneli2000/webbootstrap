import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import{AngularFireList} from '@angular/fire/database/database'


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private db : AngularFireDatabase) { }

  getDataShqip(){
    return(this.db.list('projekte/projects').snapshotChanges())
  }
  updateProjectImage(key,url){
    this.db.list('projekte/projects').update(key,{
      imageUrl : url
    })
  }
  updateProject(titulliShqip,titulliAnglsht,detajeShqip,DetajeAnglisht,key){
    this.db.list('projekte/projects').update(key,{
      titulli : titulliShqip,
      detaje : detajeShqip,
      detajeanglisht:DetajeAnglisht,
      titullianglisht:  titulliAnglsht
    })
  }
  addNewProjet(titulliShqip,detajeShqip,titulliAnglisht,detajeAnglisht){
    this.db.list('projekte/projects').push({
      imageUrl : 'https://firebasestorage.googleapis.com/v0/b/primaenrgy-7887e.appspot.com/o/RoomsImages%2F1589882706015?alt=media&token=8f02f2ae-f962-4a9b-8bc5-3933109ee02f', 
      titulli :titulliShqip,
      detaje :detajeShqip,
      titullianglisht :titulliAnglisht,
      detajeanglisht : detajeAnglisht
    });
  }

deleteProject(key){
  this.db.list('projekte/projects').remove(key);
}
//settings

getSettings(){
 return( this.db.list('projekte/settings/').snapshotChanges());
}
setSetting(setting : string , value : any){
  delete value.key;
  this.db.list('projekte/settings').update(setting,value);
}


checkGalery(){
 return this.db.list('projekte/galeri').snapshotChanges();
}
addGAlleryEmpty(){
this.db.list('projekte/galeri').push({'src':
'https://firebasestorage.googleapis.com/v0/b/primaenrgy-7887e.appspot.com/o/RoomsImages%2F1589882706015?alt=media&token=8f02f2ae-f962-4a9b-8bc5-3933109ee02f',
'caption':'','thumb':'https://firebasestorage.googleapis.com/v0/b/primaenrgy-7887e.appspot.com/o/RoomsImages%2F1589882706015?alt=media&token=8f02f2ae-f962-4a9b-8bc5-3933109ee02f'});
}

updateGallery(key,url){
  console.log(key);
  console.log(url);
this.db.list('projekte/galeri').update(key,{
  caption : "",
  src : url,
  thumb : url
});
}

addGallery(url){
  this.db.list('projekte/galeri').push({
    caption : "",
    src : url,
    thumb : url
  });
}
deleteGallery(key){
  this.db.list('projekte/galeri').remove(key);
}
}
