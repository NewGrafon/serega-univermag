export enum Categories {
  Всё = 'Всё',
  Продукты_питания = 'Продукты питания',
  Остальное = 'Остальное'
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
    category: Categories.Остальное,
    name: 'Деревянный пенис',
    description: 'ыыы',
    imageName: null,
    price: 1200
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
  }, {
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
