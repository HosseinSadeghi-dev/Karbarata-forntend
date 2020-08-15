import { environment } from '@env/environment';
import {decode} from "punycode";

export class Helpers {

  constructor(){}


  public getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  public convertDate(date,local): string{
    return new Date(date).toLocaleDateString(local);
  }
  public convertDateTime(date): string{
    return new Date(date).toLocaleDateString('fa-Ir',{year:"2-digit",month:"2-digit", day:"2-digit",hour: '2-digit',minute:'2-digit'});
  }

  handleLogin(msg:string){
    // let snackBarRef = this.snackBar.open(msg,'ورود',{duration: 2500});
    // snackBarRef.afterDismissed().subscribe(() => {
    //   // this.needLogin.next(true);
    // });
  }

  get redirect(){
    const url = localStorage.getItem('redirect');
    if (url){
      return decode(url);
    }
    return null;
  }
  deleteRedirect(){
    localStorage.removeItem('redirect');
  }

  arrayToString(data,key):string[] {
    let categories = [];
    data.forEach((element)=>{
      categories.push(element[key]);
    });
    return categories;
  }

  imageSrc(data):string {
    return environment.serverUrl + data;
  }
}
