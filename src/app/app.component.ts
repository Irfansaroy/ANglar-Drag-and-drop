import { Component, ViewChild } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { NgbCarousel } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  imageItemToDisplay: any = {};
  popupVisible = false;
  belowImageData;
  @ViewChild("carousel", { static: false }) carousel: NgbCarousel;

  constructor() {
    this.belowImageData = JSON.parse(JSON.stringify(this.imagens));
    this.belowImageData.splice(0, 1);
  }

  change(imagens) {
    this.belowImageData = JSON.parse(JSON.stringify(this.imagens));
    this.belowImageData.splice(imagens.current, 1);
  }

  //   drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.imagens, event.previousIndex, event.currentIndex);
  // }

  // dropBig(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.imagens, event.previousIndex, 0);
  // }

  imagens = [
    {
      Imagem: "https://preview.ibb.co/kZGsLm/img8.jpg"
    },
    {
      Imagem: "https://preview.ibb.co/kPE1D6/clouds.jpg"
    },
    {
      Imagem: "https://angularbooks.com/img/angular4/img3.jpg"
    }
  ];
  imagens2 = this.imagens.map(x => ({ ...x }));
  dropOld(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const imagen = { ...(event.container.data[event.currentIndex] as any) };
      const previousImagen = {
        ...(event.previousContainer.data[event.previousIndex] as any)
      };
      event.container.data.splice(event.currentIndex, 1, previousImagen);
      event.previousContainer.data.splice(event.previousIndex, 1, imagen);
    }
  }
}
