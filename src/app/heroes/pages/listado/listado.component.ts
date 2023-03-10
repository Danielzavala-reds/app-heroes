import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`

    mat-card{
      margin-top: 20px;
    }
  
  `
  ]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];


  constructor(private heroesService: HeroesService){}

  ngOnInit():void{
      this.heroesService.getHeroes()
        .subscribe( heroes => {
          // console.log(heroes)
          this.heroes = heroes
        } )
  }

}
