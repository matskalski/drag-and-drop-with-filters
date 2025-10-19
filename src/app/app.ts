import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ListFilterPipe } from './list-filter.pipe';

@Component({
  selector: 'app-root',
  imports: [
    CdkDropList,
    CdkDrag,
    MatInputModule,
    ListFilterPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  selectedFilterText: string = '';
  availableFilterText: string = '';

  dummy = 0;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      //zmiana kolejności w obrębie jednej listy
      console.log('zmiana 1')
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
       console.log('zmiana2 ', event, event.previousContainer.id, event.container.id,  event.previousContainer.data,  event.container.data, event.previousIndex, event.currentIndex)

       let itemId = event.previousContainer.data[event.previousIndex]
       console.log(itemId)






      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );

      let item = 1

    }

    this.dummy++;

    //console.log(this.todo, this.done)
  }

  //  drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer !== event.container) {
  //     let itemId = event.previousContainer.data[event.previousIndex].id;
  //     if (event.previousContainer.id == 'selectedList') {
  //       this.moveItem(this.todo, this.done, itemId);
  //     } else {
  //       this.moveItem(this.todo, this.done, itemId);
  //     }
  //     this.dummy++;
  //   }
  // }

  // moveItem(fromList: string[], toList:string[], itemId: any) {
  //   let item = fromList.find((x) => x == itemId);
  //   let itemIndex = fromList.findIndex((x) => x == item);
  //   fromList.splice(itemIndex, 1);
  //   toList.push(item);
  // }

  input(e: Event){
     //const value = (e.target as HTMLInputElement).value
    this.selectedFilterText = (e.target as HTMLInputElement).value
  }
}
