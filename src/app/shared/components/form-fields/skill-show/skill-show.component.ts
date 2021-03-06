import {Component, Input, OnInit} from '@angular/core';
import {SrcImagePipe} from "../../../pipes/src-image.pipe";

@Component({
  selector: 'app-skill-show',
  templateUrl: './skill-show.component.html',
  styleUrls: ['./skill-show.component.scss'],
  providers: [
    SrcImagePipe
  ]
})
export class SkillShowComponent implements OnInit {

  @Input() image: string;
  @Input() name: string;
  @Input() slug: string;
  @Input() localImg: boolean = false;

  constructor(
    private srcImagePipe: SrcImagePipe
  ) { }

  ngOnInit(): void {
  }

  getUrl()
  {
    if(!this.localImg){
      return "url(" + this.srcImagePipe.transform(this.image, '') +" ) ";
    }
    else{
      return "url(" + this.image +" ) ";
    }

  }

}
