import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: "root"
})
export class AppService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  constructor(
    private snackBar: MatSnackBar,
  ){}

  nextLoading = (data: boolean) =>{
    this.loadingSubject.next(data);
  }


  handleResponse(data){this.snackBar.open(data, '', {duration: 5000,})}
  handleError(error){this.snackBar.open(error, '', {duration: 5000, panelClass: ['danger-snackbar']})};


}
