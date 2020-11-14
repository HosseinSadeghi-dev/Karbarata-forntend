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
        {id:0, imgSrc:'assets/image/redesignHal.jpg'},
        {id:1, imgSrc:'assets/image/redesignHal2.jpg'},
        {id:2, imgSrc:'assets/image/redesignHal3.jpg'},
        {id:3, imgSrc:'assets/image/redesignHal4.jpg'},
        {id:4, imgSrc:'assets/image/redesignHal5.jpg'},
        {id:5, imgSrc:'assets/image/redesignHal6.jpg'},
        {id:6, imgSrc:'assets/image/redesignHal7.jpg'},
        {id:7, imgSrc:'assets/image/redesignHal8.jpg'},
        {id:8, imgSrc:'assets/image/redesignHal9.jpg'},
        {id:9, imgSrc:'assets/image/redesignHal10.jpg'},
        {id:10, imgSrc:'assets/image/redesignHal11.jpg'},
        {id:11, imgSrc:'assets/image/redesignHal12.jpg'},
      ]
    },
    {
      title: 'طراحی و اجرا باغ - ویلا',
      works:[
        {id:0, imgSrc:'assets/image/baq1.jpg'},
        {id:1, imgSrc:'assets/image/baq2.jpg'},
        {id:2, imgSrc:'assets/image/baq3.jpg'},
        {id:3, imgSrc:'assets/image/baq4.jpg'},
        {id:4, imgSrc:'assets/image/baq5.jpg'},
        {id:5, imgSrc:'assets/image/baq6.jpg'},
        {id:6, imgSrc:'assets/image/baq7.jpg'},
        {id:7, imgSrc:'assets/image/baq8.jpg'},
        {id:8, imgSrc:'assets/image/baq9.jpg'},
        {id:9, imgSrc:'assets/image/baq10.jpg'},
      ]
    },
    {
      title: 'طراحی و اجرا واحد مسکونی',
      works:[
        {id:0, imgSrc:'assets/image/Residential1.jpg'},
        {id:1, imgSrc:'assets/image/Residential2.jpg'},
        {id:2, imgSrc:'assets/image/Residential3.jpg'},
        {id:3, imgSrc:'assets/image/Residential4.jpg'},
        {id:4, imgSrc:'assets/image/Residential5.jpg'},
      ]
    },
    {
      title: 'طراحی و اجرا واحد های تجاری و دفتر کار',
      works:[
        {id:0, imgSrc:'assets/image/Office1.jpg'},
        {id:1, imgSrc:'assets/image/Office2.jpg'},
        {id:2, imgSrc:'assets/image/Office3.jpg'},
        {id:3, imgSrc:'assets/image/Office4.jpg'},
        {id:4, imgSrc:'assets/image/Office5.jpg'},
        {id:5, imgSrc:'assets/image/Office6.jpg'},
        {id:6, imgSrc:'assets/image/Office7.jpg'},
        {id:7, imgSrc:'assets/image/Office8.jpg'},
        {id:8, imgSrc:'assets/image/Office9.jpg'},
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
