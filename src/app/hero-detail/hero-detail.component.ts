import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ],
  animations:[
    trigger('superAnim',[
      state('small',style({
        transform: 'scale(1)'
      })),
      state('large',style({
        transform: 'scale(1.2)'
      })),
      // transition('small <=> large',animate('300ms ease-in',style({
      //   transform: 'transateY(40px)'
      // }))),
      transition('small <=> large',animate('300ms ease-in',keyframes([
        style({opacity:0,transform: 'transateY(-75%)',offset:0}),
        style({opacity:1,transform: 'transateY(35px)',offset:.5}),
        style({opacity:1,transform: 'transateY(0)',offset:1})
      ]))),
    ]),


  ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
  state: string = 'small';

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  startAnimation(): void {
    this.state = (this.state === 'small' ? 'large': 'small');
  }
}