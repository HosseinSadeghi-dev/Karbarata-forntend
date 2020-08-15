import {FormControl} from '@angular/forms';

export interface Credentials {
  token: string;
}

export interface UserContext {
  mobile: string;
  password: string;
}

export interface ProfileContext {
  id?: number,
  name?: string,
  lastName?: string,
  fullName?: string,
  email?: string,
  houseNumber?: string,
  address?: string
  image?: string,
  pid?: string,
  phoneNumber?: string,
  roles?: UserRole[],
  status?: UserStatus,
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  AUTHOR = 'author'
}

export enum UserStatus {
  ACTIVATE = 'activate',
  DEACTIVATE = 'deactivate'
}


function isValidNational(control: FormControl) {
  const promise = new Promise((resolve, reject) => {
    const value = control.value;
    if (!value) resolve(null);

    if (!/^\d{10}$/.test(value)) {
      resolve({ async: { message: "لطفا کد ملی معتبر وارد نمایید" } });
    }

    var check = parseInt(value[9]);
    var sum = 0;
    var i;
    for (i = 0; i < 9; ++i) {
      sum += parseInt(value[i]) * (10 - i);
    }
    sum %= 11;

    if ((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)) {
      resolve(null);
    } else resolve({ async: { message: "لطفا کد ملی معتبر وارد نمایید" } });
  });
  return promise;
}
