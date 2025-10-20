import { ColumnsService } from './column/columns.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ListFilterPipe } from './list-filter.pipe';
import { ColumnModel } from './column/column.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  nonDisplayedColumns: ColumnModel[] = [];
  displayedColumns: ColumnModel[] = [];

  selectedFilterText: string = '';
  availableFilterText: string = '';

  triggerPipe = 0;

  private columnsService = inject(ColumnsService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.columnsService.getColumns()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(cols => {
        this.nonDisplayedColumns = cols.filter(col => !col.isDisplayed);
        this.displayedColumns = cols.filter(col => col.isDisplayed);
      });
  };


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      //zmiana kolejności w obrębie jednej listy
      console.log('zmiana 1')
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //przenoszenie między listami
      console.log('zmiana2 ', event, event.previousContainer.id, event.container.id, event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)

      let itemId = event.previousContainer.data[event.previousIndex]
      console.log(itemId)

      let from: string[];
      let to: string[];

      if (event.previousContainer.id === 'todoList') {
        from = this.todo;
        to = this.done;
      }
      else {
        from = this.done;
        to = this.todo;
      }

      let itemIndex = from.findIndex((x) => x == itemId);
      from.splice(itemIndex, 1);
      to.splice(event.currentIndex, 0, itemId)

      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );
    }

    this.triggerPipe++;
  }

  filterTodo(e: Event) {
    this.selectedFilterText = (e.target as HTMLInputElement).value
  }

  filterDone(e: Event) {
    this.availableFilterText = (e.target as HTMLInputElement).value
  }
}
