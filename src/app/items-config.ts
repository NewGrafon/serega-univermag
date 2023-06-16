import {Pipe, PipeTransform} from "@angular/core";

export enum Categories {
  Всё = '0',
  Продукты_питания = '1',
  Остальное = '999'
}

@Pipe({
  name: 'ReplaceUnderlinesToSpaces'
})
export class ReplaceUnderlinesToSpaces implements PipeTransform {
  transform(str: string): string {
    return str.replaceAll('_', ' ');
  }
}

export interface IItemInfo {
  id: string,
  category: Categories,
  name: string,
  description: string,
  weight: number, /* в граммах */
  image: IImage | null,
  price: number,
  createdAt: Date
}

export interface IImage {
  mimetype: string,
  buffer: string
}
