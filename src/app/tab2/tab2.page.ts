import { Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonCol, IonRow, IonGrid, IonImg, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { PhotoService } from '../services/photo.service';
import { addIcons } from 'ionicons';
import { camera, trash } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonItem, CommonModule, IonImg, IonGrid, IonRow, IonCol, IonIcon, IonFabButton, IonFab, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page implements OnInit {

  mouseDownTimer: any;
  clickHoldTime = 1000; // tiempo en milisegundos para considerar un click sostenido
  selectedPhotos: number[] = [];

  constructor(public photoService: PhotoService) {
    addIcons({ camera, trash });
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.selectedPhotos = [];
    this.photoService.addNewToGallery();
  }

  selectPhoto(index: number) {
    if (!this.selectedPhotos.includes(index)) {
      this.selectedPhotos.push(index);
    } else {
      const selectedIndex = this.selectedPhotos.indexOf(index);
      this.selectedPhotos.splice(selectedIndex, 1);
    }
  }

  deletePhotos(){
    this.photoService.deletePhotos(this.selectedPhotos);
    this.selectedPhotos = [];
  }
}
