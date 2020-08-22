import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-work',
  templateUrl: './sample-work.component.html',
  styleUrls: ['./sample-work.component.scss']
})




export class SampleWorkComponent implements OnInit {

  public samples = [
    {
      title: 'ساختمان',
      works:[
        {id:0, imgSrc:'assets/image/sakhtemon.png'},
        {id:1, imgSrc:'assets/image/sakhtemon.png'},
        {id:2, imgSrc:'assets/image/sakhtemon.png'},
        {id:3, imgSrc:'assets/image/sakhtemon.png'},
      ]
    },
    {
      title: 'نمونه دو',
      works:[
        {id:0, imgSrc:'assets/image/sakhtemon.png'},
        {id:1, imgSrc:'assets/image/sakhtemon.png'},
        {id:2, imgSrc:'assets/image/sakhtemon.png'},
        {id:3, imgSrc:'assets/image/sakhtemon.png'},
      ]
    },
    {
      title: 'نمونه سه',
      works:[
        {id:0, imgSrc:'assets/image/sakhtemon.png'},
        {id:1, imgSrc:'assets/image/sakhtemon.png'},
        {id:2, imgSrc:'assets/image/sakhtemon.png'},
        {id:3, imgSrc:'assets/image/sakhtemon.png'},
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
