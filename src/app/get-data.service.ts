import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import{AngularFireList} from '@angular/fire/database/database'


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private db : AngularFireDatabase) { }

  getDataShqip(){
    return(this.db.list('projekte').snapshotChanges())
  }
  updateProjectImage(key,url){
    this.db.list('projekte').update(key,{
      imageUrl : url
    })
  }
  updateProject(titulliShqip,titulliAnglsht,detajeShqip,DetajeAnglisht,key){
    this.db.list('projekte').update(key,{
      titulli : titulliShqip,
      detaje : detajeShqip
    })
  }
  addNewProjet(titulliShqip,detajeShqip,titulliAnglisht,detajeAnglisht){
    this.db.list('projekte').push({
      imageUrl : 'https://firebasestorage.googleapis.com/v0/b/primaenrgy-7887e.appspot.com/o/RoomsImages%2F1589882706015?alt=media&token=8f02f2ae-f962-4a9b-8bc5-3933109ee02f', 
      titulli :titulliShqip,
      detaje :detajeShqip,
      titullianglisht :titulliAnglisht,
      detajeanflisht : detajeAnglisht
    })
  }
}
