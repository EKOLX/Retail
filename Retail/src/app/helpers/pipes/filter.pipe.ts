import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  pure: true
})
export class FilterPipe implements PipeTransform {
  transform(itemsArray: any, filterString: string, propertyName: string): any {
    if (itemsArray.length === 0 || filterString === "") return itemsArray;

    const resultArray = [];
    for (const item of itemsArray) {
      if (
        item[propertyName].toLowerCase().includes(filterString.toLowerCase())
      ) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
