import {
  ProfileContext,
  MasterSkillContext,
  GalleryPhotoContext,
  PaymentContext,
  WorkforceSimpleType,
  MasterCategoryContext, AdviceCategoryContext
} from './';

export interface RequestContext {
  id?: number,
  address?: string,
  houseNumber?: number,
  approximateArea?: number,
  statusPerDay?: number,
  description?: string,
  isForce?: boolean,
  serviceDate?: Date,
  serviceTime?: string,
  user?: ProfileContext,

  //status
  status?: RequestStatusContext[],

  //types
  simple?: RequestSimpleContext,
  master?: RequestMasterContext,
  construct?: RequestConstructContext,
  priceAdvice?: RequestPriceAdvice,
  MunicipalService?: RequestMunicipalService

  expert?: RequestExpertContext,
  reports?: RequestReportContext[],
  contractors?: ProfileContext[],
  statusStatements?: RequestStatusStatementContext[],

  created?: Date,
  updated?: Date
}

export interface RequestPriceAdvice {
  id?: number,
  description?: string,
  type?: AdviceCategoryContext,
  created?: Date,
  updated?: Date
}

export interface RequestMunicipalService {
  id?: number,
  description?: string,
  created?: Date,
  updated?: Date
}

export interface RequestStatusContext {
  id?: number,
  description?: string,
  type?: RequestStatusType,
  created?: Date,
  updated?: Date
}
export interface RequestSimpleContext {
  id?: number,
  quantity?: number,
  cost?: number,
  type?: WorkforceSimpleType,
  duration?: number,
  user?: ProfileContext,
  request?: RequestContext,
  workforces?: ProfileContext[],
  created?: Date,
  updated?: Date
}
export interface RequestMasterContext {
  id?: number,
  skills?: MasterSkillContext[],
  workforces?:RequestMasterWorkforceContext[],
  request?: RequestContext,
  user?: ProfileContext,
  created?: Date,
  updated?: Date
}
export interface RequestConstructContext {
  id?: number,
  construct?: ConstructContext
  request?: RequestContext,
  type?: RequestConstructType,
  masterWorkforces?: RequestMasterContext,
  simpleWorkforces?: RequestSimpleContext
  created?: Date,
  updated?: Date
}
export interface ConstructContext {
  id?: number,
  name?: string,
  slug?: string,
  description?: string,
  body?: string,
  tagList?: string[],
  image?: GalleryPhotoContext
  svg?: GalleryPhotoContext
}
export interface RequestExpertContext {
  id?: number,
  user?: ProfileContext,
  request?: RequestContext,
  created?: Date,
  updated?: Date
}
export interface RequestReportContext {
  id?: number,
  title?: string,
  type?: RequestReportType,
  body?: string,
  user?: ProfileContext,
  request?: RequestContext,
  created?: Date,
  updated?: Date,
}
export interface RequestStatusStatementContext {
  id?: number,
  isExpertApproval?: boolean,
  tax?: number,
  type?: StatusStatementItemUnit,
  items?: RequestStatusStatementItemContext[],
  user?: ProfileContext,
  invoice?: RequestInvoiceContext,
  request?: RequestContext,
  created?: Date,
  updated?: Date
}

export interface RequestInvoiceContext {
  id?: number,
  accountant?: ProfileContext,
  costTotal?: number,
  request?: RequestContext,
  statusStatements?: RequestStatusStatementContext[],
  payment?: PaymentContext,
  created?: Date,
  updated?: Date
}

export interface RequestStatusStatementItemContext {
  id?: number,
  name?: string,
  cost?: string,
  quantity?: number,
  costTotal?: string,
  unit?: StatusStatementItemUnit
}

export interface RequestMasterWorkforceContext {
  id?: number;
  cost?: number;
  skill?: MasterSkillContext;
  user?: ProfileContext;
}

export interface RequestContact {
  id?: number,
  name?: string,
  email?: string,
  phoneNumber?: string,
  description?: string,
  score?: number,
  experience?: number,
  address?: string,
  field?: MasterCategoryContext
}

export enum RequestStatusType {
  AWAITING_OP,
  CANCEL_OP,
  APPROVAL_OP,
  AWAITING_EXP,
  CANCEL_EXP,
  APPROVAL_EXP,
  WORKING,
  INVOICE,
  DONE
}
export enum RequestConstructType {
  DESIGNING = 'Designing',
  BOTH = 'both'
}
export enum RequestReportType {
  EDIT = 'edit',
  ESTIMATION = 'estimation',
  OTHER = 'other'
}
export enum StatusStatementItemUnit {
  PERSON = 'person',
  KG = 'kg'
}
export enum StatusStatementType {
  STUFF = 'stuff',
  WORKFORCE = 'workforce',
  BOTH = 'both'
}

