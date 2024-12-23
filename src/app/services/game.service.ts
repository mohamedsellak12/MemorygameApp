import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private movesSubject=new BehaviorSubject<number>(0);
  moves$=this.movesSubject.asObservable();
  private trySubject=new BehaviorSubject<number>(0);
  try$=this.trySubject.asObservable();

  private disableClickSubject=new BehaviorSubject<boolean>(false);
  disableClick$=this.disableClickSubject.asObservable();


  desactiveClick(){
    this.disableClickSubject.next(true);
  }
  active(){
    this.disableClickSubject.next(false);
  }
  reset(){
    this.movesSubject.next(0);
    this.trySubject.next(0);
 
  }
  incrementMoves(){
    this.movesSubject.next(this.movesSubject.value+1);
  }
  incrementTry(){
    this.trySubject.next(this.trySubject.value+1);
  }
 
}
