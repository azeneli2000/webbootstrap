import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
})
export class SettingsModalComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public modalData = {
   
    key:'',
    teksti:'',
    tekstiAnglisht : ''
    
  };
  constructor(public activeModal: NgbActiveModal, private data : GetDataService) { }

  ngOnInit(): void {
    console.log(this.modalData.key)
  }
  passBack() {
    this.passEntry.emit(this.modalData);
    
    console.log(this.modalData.key)
    this.data.setSetting(this.modalData.key,this.modalData);
    
    this.activeModal.close(this.modalData);
  }
}
