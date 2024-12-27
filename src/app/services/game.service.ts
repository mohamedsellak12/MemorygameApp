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
  private scoreSubject=new BehaviorSubject<number>(100);
  score$=this.scoreSubject.asObservable();

  private disableClickSubject=new BehaviorSubject<boolean>(false);
  disableClick$=this.disableClickSubject.asObservable();
  private isOverSubject=new BehaviorSubject<boolean>(false)
  isOver$=this.isOverSubject.asObservable();


  desactiveClick(){
    this.disableClickSubject.next(true);
  }
  active(){
    this.disableClickSubject.next(false);
  }
  reset(){
    this.movesSubject.next(0);
    this.trySubject.next(0);
    this.isOverSubject.next(false);
 
  }
  incrementMoves(){
    this.movesSubject.next(this.movesSubject.value+1);
  }
  incrementTry(){
    this.trySubject.next(this.trySubject.value+1);
  }
  resetScore(){
    this.scoreSubject.next(100);
  }
  gameOver(){
    this.isOverSubject.next(true);
  }
 
}
