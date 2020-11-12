import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {AppService} from '../../../../core/services';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0}))
      ])
    ])
  ]
})
export class PreloaderComponent implements OnInit {
  @Input() isLoading: boolean;

  constructor(private appService: AppService,
              private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.appService.loading$.subscribe(value => {
      this.isLoading = value;
      this.cdr.detectChanges();
    });
  }

}
