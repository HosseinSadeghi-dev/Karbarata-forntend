import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-work',
  templateUrl: './sample-work.component.html',
  styleUrls: ['./sample-work.component.scss']
})




export class SampleWorkComponent implements OnInit {

  public samples = [
    // {
    //   title: 'تامین نیرو',
    //   works:[
    //     {id:0, imgSrc:'assets/image/Services/sakhtemon.png'},
    //     {id:1, imgSrc:'assets/image/Services/sakhtemon.png'},
    //     {id:2, imgSrc:'assets/image/Services/sakhtemon.png'},
    //     {id:3, imgSrc:'assets/image/Services/sakhtemon.png'},
    //   ]
    // },
    {
      title: 'باز طراحی و بازسازی',
      works:[
        {id:0, imgSrc:'assets/image/Services/Redesign/1.jpg'},
        {id:1, imgSrc:'assets/image/Services/Redesign/2.jpg'},
        {id:2, imgSrc:'assets/image/Services/Redesign/3.jpg'},
        {id:3, imgSrc:'assets/image/Services/Redesign/4.jpg'},
        {id:4, imgSrc:'assets/image/Services/Redesign/5.jpg'},
        {id:5, imgSrc:'assets/image/Services/Redesign/6.jpg'},
        {id:6, imgSrc:'assets/image/Services/Redesign/7.jpg'},
        {id:7, imgSrc:'assets/image/Services/Redesign/8.jpg'},
        {id:8, imgSrc:'assets/image/Services/Redesign/9.jpg'},
        {id:9, imgSrc:'assets/image/Services/Redesign/10.jpg'},
        {id:10, imgSrc:'assets/image/Services/Redesign/11.jpg'},
        {id:11, imgSrc:'assets/image/Services/Redesign/12.jpg'},
      ]
    },
    {
      title: 'طراحی و اجرا باغ - ویلا',
      works:[
        {id:0, imgSrc:'assets/image/Services/Baq/1.jpg'},
        {id:1, imgSrc:'assets/image/Services/Baq/2.jpg'},
        {id:2, imgSrc:'assets/image/Services/Baq/3.jpg'},
        {id:3, imgSrc:'assets/image/Services/Baq/4.jpg'},
        {id:4, imgSrc:'assets/image/Services/Baq/5.jpg'},
        {id:5, imgSrc:'assets/image/Services/Baq/6.jpg'},
        {id:6, imgSrc:'assets/image/Services/Baq/7.jpg'},
        {id:7, imgSrc:'assets/image/Services/Baq/8.jpg'},
        {id:8, imgSrc:'assets/image/Services/Baq/9.jpg'},
        {id:9, imgSrc:'assets/image/Services/Baq/10.jpg'},
      ]
    },
    {
      title: 'طراحی و اجرا واحد مسکونی',
      works:[
        {id:0, imgSrc:'assets/image/Services/Residential/1.jpg'},
        {id:1, imgSrc:'assets/image/Services/Residential/2.jpg'},
        {id:2, imgSrc:'assets/image/Services/Residential/3.jpg'},
        {id:3, imgSrc:'assets/image/Services/Residential/4.jpg'},
        {id:4, imgSrc:'assets/image/Services/Residential/5.jpg'},
      ]
    },
    {
      title: 'طراحی و اجرا واحد های تجاری و دفتر کار',
      works:[
        {id:0, imgSrc:'assets/image/Services/Office/1.jpg'},
        {id:1, imgSrc:'assets/image/Services/Office/2.jpg'},
        {id:2, imgSrc:'assets/image/Services/Office/3.jpg'},
        {id:3, imgSrc:'assets/image/Services/Office/4.jpg'},
        {id:4, imgSrc:'assets/image/Services/Office/5.jpg'},
        {id:5, imgSrc:'assets/image/Services/Office/6.jpg'},
        {id:6, imgSrc:'assets/image/Services/Office/7.webp'},
        {id:7, imgSrc:'assets/image/Services/Office/8.webp'},
        {id:8, imgSrc:'assets/image/Services/Office/9.jpg'},
        {id:9, imgSrc:'assets/image/Services/Office/10.jpg'},
        {id:10, imgSrc:'assets/image/Services/Office/11.jpg'},
        {id:11, imgSrc:'assets/image/Services/Office/12.jpg'},
        {id:11, imgSrc:'assets/image/Services/Office/13.webp'},
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
