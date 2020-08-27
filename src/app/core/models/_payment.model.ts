import {RequestInvoiceContext} from './';

export interface PaymentContext {
  id?: number,
  amount?: string,
  cardHolderInfo?: string,
  cardHolderPan?: string,
  description?: string,
  device?: string,
  method?: PaymentMethod,
  status?: PaymentStatus,
  terminal?: number,
  referenceId?: string,
  saleReferenceId?: string,
  invoice?: RequestInvoiceContext,
  created?: Date,
  updated?: Date
}

export enum PaymentMethod {
  POS = 'pos',
  GATEWAY = 'gateway',
  CHARGE = 'charge'
}
export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  CANCELED = 'canceled'
}
