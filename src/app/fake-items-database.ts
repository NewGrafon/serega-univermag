export enum Categories {
  Other
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
    category: Categories.Other,
    name: '0',
    description: '0',
    imageName: null,
    price: 0
  },
  {
    id: '0',
    category: Categories.Other,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Other,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Other,
    name: '',
    description: '',
    imageName: '',
    price: 0
  }, {
    id: '0',
    category: Categories.Other,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Other,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Other,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Other,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Other,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Other,
    name: '',
    description: '',
    imageName: '',
    price: 0
  },
  {
    id: '0',
    category: Categories.Other,
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
