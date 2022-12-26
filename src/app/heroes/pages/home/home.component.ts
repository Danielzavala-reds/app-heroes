import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  
    .container{
      margin: 10px;
    }
  
  `
  ]
})
export class HomeComponent {

  // auth!: Auth; //undefined

  get auth(){     //Este get lo usamos para que retorne el usuario que esta en la base de datos, lo madamos llamar desde el servicio y se muestra en el HTML
    return this.authService.auth;
  }

  constructor(private router: Router,
              private authService: AuthService){}
    
  logout(){



    this.router.navigate(['/auth'])
  }

}
