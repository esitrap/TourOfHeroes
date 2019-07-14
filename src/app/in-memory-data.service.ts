import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Haj Rasoul' },
      { id: 12, name: 'Haj Agha' },
      { id: 13, name: 'Bagher' },
      { id: 14, name: 'Haj Amin' },
      { id: 15, name: 'Haj Masoud' },
      { id: 16, name: 'PirPatal' },
      { id: 17, name: 'Ebi' },
      { id: 18, name: 'abi' },
      { id: 19, name: 'amoghli' },
      { id: 20, name: 'Reza Parhizkar' }
    ];
    return { heroes };

  }
  genid(heroes: Hero[]): number {
  return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
}
}

