import { Injectable } from '@angular/core';
import { Card } from '../Card';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardClickedSubject =new Subject<Card>();
  cardClicked$ = this.cardClickedSubject.asObservable();
  constructor() { }

  emitCardClicked(card:Card){
    this.cardClickedSubject.next(card);
  }
}
