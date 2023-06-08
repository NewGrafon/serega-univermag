export enum Categories {
  Всё = '0',
  Продукты_питания = '1',
  Остальное = '2'
}

export interface IItemInfo {
  id: string,
  category: Categories,
  name: string,
  description: string,
  imageName: string | null,
  price: number
}

const fakeDB: IItemInfo[] = [
  {
    id: '0',
    category: Categories.Продукты_питания,
    name: 'Лапша ДОШИРАК куриная по-домашнему, 80г',
    description: 'ням ням!',
    imageName: 'doshirak.png',
    price: 60
  },
  {
    id: '1',
    category: Categories.Продукты_питания,
    name: 'Лапша "Доширак" Сытный обед с курицей 110гр',
    description: '',
    imageName: 'doshirak_another.jpg',
    price: 90
  },
  {
    id: '2',
    category: Categories.Продукты_питания,
    name: 'Светлое пиво Жигули Барное',
    description: '',
    imageName: 'Zhiguli.webp',
    price: 120
  },
  {
    id: '3',
    category: Categories.Остальное,
    name: 'Стол "Река"',
    description: '',
    imageName: 'Stol_reka.jpg',
    price: 3000
  },
  {
    id: '0',
    category: Categories.Остальное,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Остальное,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Остальное,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Остальное,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Остальное,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Остальное,
    name: '',
    description: '',
    imageName: '',
    price: 0
  }
];

export function GetFakeDB(): IItemInfo[] {
  const withoutDuplicates: IItemInfo[] = [];

  fakeDB.forEach(item => {
    let itemWithThisIDisExist: boolean = false;

    withoutDuplicates.forEach(wdItem => {
      if (item.id === wdItem.id) {
        itemWithThisIDisExist = true;
        return;
      }
    });

    if (!itemWithThisIDisExist) {
      withoutDuplicates.push(item);
    }
  });

  return withoutDuplicates;
}
