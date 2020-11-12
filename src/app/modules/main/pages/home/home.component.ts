import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public works:any[] = [
    {name:'نیرو ساده', imgSrc:'assets/image/simple-worker.png' ,slug:"simple"},
    {name:'نیرو متخصص', imgSrc:'assets/image/expert-worker.png' ,slug:"master"},
    {name:'طراحی ، ساخت و ساز', imgSrc:'assets/image/construct-worker.png' ,slug:"construct"},
    {name:'خدمات شهرداری', imgSrc:'assets/image/municipal-worker.png' ,slug:"municipality"},
    {name:'مشاوره و استعلام قیمت', imgSrc:'assets/image/price-advise-worker.png' ,slug:"price-advice"}
  ]

  constructor() { }

  ngOnInit(): void {}

}
