import { Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonCol, IonRow, IonGrid, IonImg, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { PhotoService } from '../services/photo.service';
import { addIcons } from 'ionicons';
import { camera, trash, close } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ActionSheetController } from '@ionic/angular/standalone';
import { UserPhoto } from 'src/model/interface';

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

  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController) {
    addIcons({ camera, trash, close });
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

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }
}
