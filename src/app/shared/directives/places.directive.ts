import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPlaces]',
})
export class PlacesDirective implements OnInit {
  @Input() appPlaces: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const isEmpty = this.appPlaces === 0;
    const isMoreThanZero = this.appPlaces > 0 && this.appPlaces < 10;
    const isMoreThanTen = this.appPlaces >= 10 && this.appPlaces < 20;
    const isMoreThanTwenty = this.appPlaces >= 20;

    if (isEmpty) return this.highlightBackground('gray');

    if (isMoreThanZero) return this.highlightBackground('crimson');

    if (isMoreThanTen) return this.highlightBackground('cornflowerblue');

    if (isMoreThanTwenty) return this.highlightBackground('greenyellow');
  }

  private highlightBackground(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = color;
  }
}
