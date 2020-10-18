import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private theme: BehaviorSubject<any> = new BehaviorSubject(false);
  themeStatus = this.theme.asObservable();
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  nextTheme(data: boolean){
    this.theme.next(data);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isDark', String(data));
    }
  }

  checkTheme(): boolean{
    // const manifest = document.getElementById('manifest');
    // const themeColor = document.getElementById('theme-color');
    if (isPlatformBrowser(this.platformId)) {
      const isDark = localStorage.getItem('isDark');

      if (isDark === 'true'){
        this.nextTheme(true);
        // manifest.setAttribute('href','dark.webmanifest');
        // themeColor.setAttribute('content','#303030');
        return true
      }
      else {
        this.nextTheme(false);
        // manifest.setAttribute('href','light.webmanifest');
        // themeColor.setAttribute('content','#fafafa');

        return false;
      }

    }
  }

}
