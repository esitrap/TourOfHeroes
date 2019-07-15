import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs'
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

constructor(private http : HttpClient,
  private messageService: MessageService) { }


getHeroes(): Observable < Hero[] > {

  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
}
getHero(id: Number): Observable <Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
}
updateHero(hero: Hero): Observable < any > {
  const httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.put(this.heroesUrl, hero, httpOption).pipe(
    tap(_ => this.log(`updated hero id =${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  )
}
addHero(hero : Hero): Observable<Hero>{
return this.http.post<Hero>(this.heroesUrl , hero , httpOptions).pipe(
  tap((newHero:Hero)=> this.log(`added hero w/ id=$(newHero.id`)),
  catchError(this.handleError<Hero>('this.addHero'))
)
}

private handleError<T>(operation = 'operation', resualt ?: T){
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed : $(error.message)`);
    return of(resualt as T);
  };
  }
private log(message : string){
    this.messageService.add(`HeroService : ${message}`);
  }
}
