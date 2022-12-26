import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent {

  constructor(private heroesService: HeroesService){}

  termino: string = '';
  
  heroes: Heroe[]= [];
  

   heroeSeleccionado: Heroe | undefined;



  buscando(){

    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe(heroes => this.heroes = heroes)

  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){

    // TODO: validar si es un string vacio
   if(!event.option.value){
   this.heroeSeleccionado = undefined;
    return;
   }

    const heroe: Heroe = event.option.value;
    // console.log(heroe);
    this.termino = heroe.superhero;

    this.heroesService.getHeroePorId( heroe.id! )
      .subscribe(heroe => this.heroeSeleccionado = heroe)
  }

}
