import {FormControl} from '@angular/forms';
import { MasterSkillContext, WorkforceSimpleType } from './_workforce.model';

export interface Credentials {
  token: string;
}

export interface UserContext {
  mobile: string;
  password: string;
}

export interface UserMaster {
  id?: number,
  primarySkill?: MasterSkillContext,
  secondarySkills?: MasterSkillContext[],
  shared?:Shared,
  user?:ProfileContext,
}

export interface UserAdminstrative{
  id?: number,
  user?: ProfileContext,
  insuranceCode?: number
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
  workforceMaster?: UserWorkforceMaster
  workforceSimple?: UserWorkforceSimple
}

export interface Shared{
  authImage?: string,
  exp?: string,
  id?: number,
  isAuthenticated?: boolean,
  isSmartPhone?: boolean,
  shabaNumber?: string,
  status?: UserStatus
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  AUTHOR = 'author',
  WORKER = 'worker',
  MASTER = 'master',
  EXPERT = 'expert',
  ACCOUNTANT = 'accountant',
  OPERATOR = 'operator',
  CONTRACTOR = 'contractor'
}

export enum UserStatus {
  ACTIVATE = 'activate',
  DEACTIVATE = 'deactivate'
}


export interface UserWorkforceMaster {
  id?: number,
  primarySkill?: MasterSkillContext,
  secondarySkills?: MasterSkillContext[],
  user?: ProfileContext,
  shared?: Shared
}

export interface UserWorkforceSimple {
  id?: number,
  type?: WorkforceSimpleType,
  user?: ProfileContext,
  shared?: Shared
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
