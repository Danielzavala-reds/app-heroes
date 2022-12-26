import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Heroe } from '../interfaces/heroe';
import { Observable } from 'rxjs'
import { enviroment } from 'enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = enviroment.baseUrl;

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`); /* Al poner el return cuando se llama este metodo, nos retorna un observable que regresa un objeto y nos suscribimos desde el component */
  };

  getHeroePorId(id: string): Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`); /* Aqui ya no retornamos en arreglo ya que solo mandamos a llamar un objeto en particular */
  };

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`);
  };

  postAgregarHeroe(heroe: Heroe):Observable<Heroe>{
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  };

  putAgregarHeroe(heroe: Heroe):Observable<Heroe>{
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  };

  borrarHeroe(id: string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  };

}
