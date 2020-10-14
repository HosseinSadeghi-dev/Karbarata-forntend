import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: "root"
})

export class PaymentService{

  constructor(private httpClient: HttpClient){}

  savePayment(data){
    return this.httpClient.post(`/payment/payoff`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
