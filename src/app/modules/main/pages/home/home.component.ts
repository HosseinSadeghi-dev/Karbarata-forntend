import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public works:any[] = [
    {name:'نیرو ساده', imgSrc:'assets/image/engineer.svg' ,slug:"simple"},
    {name:'نیرو متخصص', imgSrc:'assets/image/company.png' ,slug:"master"},
    {name:'طراحی ، ساخت و ساز', imgSrc:'assets/image/company.png' ,slug:"construct"},
    {name:'خدمات شهرداری', imgSrc:'assets/image/company.png' ,slug:"municipality"},
    {name:'مشاوره و استعلام قیمت', imgSrc:'assets/image/price-advise.jpg' ,slug:"price-advice"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
