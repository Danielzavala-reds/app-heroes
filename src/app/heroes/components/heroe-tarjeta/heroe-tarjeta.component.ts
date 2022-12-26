import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroe';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
`
  img{
    width: 100%;
  }
`

  ]
})
export class HeroeTarjetaComponent {

  @Input()  heroe!: Heroe;
  
}
