import { Injectable } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(private title: Title, private meta: Meta) { }


  updateTitle(title: string) {
    title ? this.title.setTitle(`${title} - راتابیت`) : this.title.setTitle('راتابیت');
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url })
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }

  updateKeywords(keywords: string){
    this.meta.updateTag({ name: 'keywords', content: keywords })
  }

  updateAuthor(author: string){
    this.meta.updateTag({name: 'author', content: 'talkingdotnet'})
  }
}
