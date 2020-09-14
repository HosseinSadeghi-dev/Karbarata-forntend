import {ProfileContext, MasterSkillContext, GalleryPhotoContext, PaymentContext, WorkforceSimpleType} from './';

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

  expert?: RequestExpertContext,
  reports?: RequestReportContext[],
  contractors?: ProfileContext[],
  statusStatements?: RequestStatusStatementContext[],

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
  type?: RequestConstructType
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

export enum RequestStatusType {
  PENDING = 'pending',
  EXPERTAPPROVAL = 'expertApproval',
  STATUSSTATEMENT = 'statusStatement',
  SETTLEMENT = 'settlement',
  DONE = 'done'
}
export enum RequestConstructType {
  DESIGNING = 'Designing',
  IMPLEMENTATION = 'implementation',
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

