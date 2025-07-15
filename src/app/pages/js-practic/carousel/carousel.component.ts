import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';
import { CAROUSEL_SLIDES, CarouselSlide } from './carousel-slides.data';

@Component({
  standalone: true,
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [RouterLink],
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperContainer', { static: false })
  swiperContainer!: ElementRef<HTMLDivElement>;
  private swiper?: Swiper;

  readonly slides: CarouselSlide[] = CAROUSEL_SLIDES;

  ngAfterViewInit() {
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      spaceBetween: 16,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        600: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  ngOnDestroy() {
    this.swiper?.destroy();
  }
}
