import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter',
})
export class ListFilterPipe implements PipeTransform {
  transform(list: string[], filterText: string, triggerPipe: number): any {
    return !filterText
      ? list
      : list.filter(
          (item) =>
            // item.description.toLowerCase().includes(filterText.toLowerCase()) ||
            // item.title.toLowerCase().includes(filterText.toLowerCase())
            item.toLowerCase().includes(filterText.toLowerCase())
        );
  }
}
