import { Injectable, Inject } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CredentialsService {
  private credentialsKey = "credentials";
  private _credentials = null;

  constructor() {
    const savedCredentials = localStorage.getItem(this.credentialsKey);
    if (savedCredentials) {
      this._credentials = savedCredentials;
    }
  }

  isAuthenticated(): boolean {
    return this._credentials;
  }

  get credentials(){
    return this._credentials;
  }

  get Roles(){
    const token = this.credentials;
    if (token){
      const payload = this.payload(token);
      return payload.roles;
    }
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    let userRoles: any = this.Roles;
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  private payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  private decode(payload) {
    return JSON.parse(atob(payload));
  }

  setCredentials(credentials?) {
    this._credentials = credentials || null;
    if (credentials) {
      localStorage.setItem(this.credentialsKey, credentials);
    } else {
      localStorage.removeItem(this.credentialsKey);
    }
  }
}
