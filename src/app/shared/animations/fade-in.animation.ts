import {animate, style, transition} from "@angular/animations";

export function fadeIn(ms?) {
  const delay = ms ? ms : 400;
  return [
    transition(':enter', [
      style({opacity: 0}),
      animate(delay+'ms ease-in', style({opacity: 1}))
    ])
  ];
}
