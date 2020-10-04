import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '@app/core/models';
import { NavService } from '@app/core/services';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})


export class MenuListItemComponent {
  expanded: boolean;

  @HostBinding('attr.aria-expanded') ariaExpanded;
  @Input() item: NavItem;
  @Input() depth: number;

  constructor(public router: Router, private navService: NavService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
    this.ariaExpanded = this.expanded
  }

  onItemSelected(item: NavItem) {
    if (!item.items || !item.items.length) {
      this.router.navigate([item.link]);
      this.navService.closeNav();
    }
    if (item.items && item.items.length) {
      this.expanded = !this.expanded;
    }
  }

}
