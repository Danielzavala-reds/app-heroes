import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe';

import { switchMap } from 'rxjs';


import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  
    img{
      width: 100%;
      border-radius: 20px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }


  /* Con este switchmap leemos nos carga la información al editarlo */
  ngOnInit(): void {

    /* Aqui verificamos mediante el url si estamos en editar, para que no nos marque undefined al momento de agregar nuevo heroe y no muestre un error */
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  };

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];


  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      // Actualizar
      this.heroesService.putAgregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.mostrarSnackBar('Registro actualizado')
          this.router.navigate(['/heroes']);
        })
    } else {
      // Crear un nuevo registro
      this.heroesService.postAgregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]); /* Al finalizar un registro, reedireccionamos a la pagina de editar el registro */
          this.mostrarSnackBar('Registro creado');
        })
    }

  };

  borrarHeroe() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      height: '160px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result => {
        if (result) {
          this.heroesService.borrarHeroe(this.heroe.id!)
            .subscribe(res => {
              this.router.navigate(['/heroes']);
            })

        }
      })
    )

  };

  mostrarSnackBar(msje: string): void {
    this._snackBar.open(msje, 'Cerrar', {
      duration: 2500
    });
  }

}
