import { ColumnModel } from './column.model';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {
  getColumns(): Observable<ColumnModel[]>{
    return of([
      {
        id: 1,
        name: 'column 1',
        canEdit: false,
        isDisplayed: false
      },
      {
        id: 2,
        name: 'column 2',
        canEdit: true,
        isDisplayed: true
      },
      {
        id: 3,
        name: 'column 3',
        canEdit: false,
        isDisplayed: false
      },
      {
        id: 4,
        name: 'column 4',
        canEdit: false,
        isDisplayed: false
      },
      {
        id: 5,
        name: 'column 5',
        canEdit: false,
        isDisplayed: false
      },
      {
        id: 6,
        name: 'column 6',
        canEdit: false,
        isDisplayed: true
      },
      {
        id: 7,
        name: 'column 7',
        canEdit: false,
        isDisplayed: false
      },
      {
        id: 8,
        name: 'column 8',
        canEdit: true,
        isDisplayed: true
      },
      {
        id: 9,
        name: 'column 9',
        canEdit: false,
        isDisplayed: false
      },
    ])
  }
}