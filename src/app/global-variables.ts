export let isLogged: boolean = false;

export let userInfo: IUserSchema = {
  firstname: null,
  lastname: null,
  email: null,
  phone: null,
  accountType: 0,
  created: null
};

export function UpdateUser(newInfo: IUserSchema, logged: boolean): void {
  isLogged = logged;
  userInfo = {
    firstname: newInfo.firstname,
    lastname: newInfo.lastname,
    email: newInfo.email,
    phone: newInfo.phone,
    accountType: newInfo.accountType,
    created: newInfo.created ? new Date(newInfo.created).toLocaleDateString('ru-RU') : null,
  }
}

export interface IUserSchema {
  firstname: string | null,
  lastname: string | null,
  email: string | null,
  phone: string | null,
  accountType: number,
  created: string | null
}
