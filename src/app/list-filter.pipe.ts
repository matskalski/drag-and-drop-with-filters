import { Pipe, PipeTransform } from '@angular/core';
import { ColumnModel } from './column/column.model';

@Pipe({
  name: 'listFilter',
})
export class ListFilterPipe implements PipeTransform {
  transform(list: ColumnModel[], filterText: string, triggerPipe: number): any {
    return !filterText
      ? list
      : list.filter(
          (item) =>
            item.name.toLowerCase().includes(filterText.toLowerCase())
        );
  }
}
