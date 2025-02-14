import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Card } from '../Card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardService } from '../services/card.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  imports: [CardComponent , CommonModule, RouterModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})

export class GameComponent implements OnInit,OnDestroy {
  
  cards:Card[] = this.shuffleCards([...this.generateCards()]);
  selectedCards: Card[] = [];
  moves = 0;
  trys = 0;
  disableClick = false;
  bestScore:number = 100;
  breakTheScre :boolean=false;
  seconds=180;
  isRunning = false;
  isDanger:boolean=false;
  private interval:any;
  isOver:boolean=false;
  constructor (private carsService:CardService , private gameService:GameService){

  }
 
  
  ngOnInit(): void {
    this.carsService.cardClicked$.subscribe((card)=>{
      this.onCardClick(card)
    })
    
    this.resetGame()
    // this.isRunning=true;

    this.gameService.disableClick$.subscribe(d=>{
      this.disableClick=d 
    })
    if(typeof localStorage !== 'undefined'){
      const bestScoreStored=localStorage.getItem('bestScore')
      if(bestScoreStored){
        this.bestScore=JSON.parse(bestScoreStored);
      }
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
  FormaTime(seconds:number){
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${mins.toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  onCardClick(card: Card) {
    if (!card.revealed) {
        card.revealed = true;
      
      this.selectedCards.push(card); // Ajout au tableau typé
      if (this.selectedCards.length === 2 ) {
        this.checkMatch();
       
      }
    }
  }
  checkMatch() {
    const [card1, card2] = this.selectedCards;
    if (card1.symbol !== card2.symbol) {
      this.gameService.desactiveClick()
      setTimeout(() => {
        card1.revealed = false;
        card2.revealed = false;
        this.gameService.active();
      }, 1000);

      
    }else if(card1.symbol === card2.symbol){
      this.gameService.incrementTry()
      card1.matched = true;
      card2.matched = true;
      this.selectedCards = [];
      //verifier le score
      this.checkBestScore()
    }
    this.gameService.incrementMoves();
    this.selectedCards = []; // Réinitialise le tableau
  }
  checkBestScore(): void {
    if(this.trys===12 ){
      this.gameService.stopRunning();
      if(this.moves<this.bestScore){
        this.bestScore=this.moves +1;
        this.breakTheScre=true;
        if(typeof localStorage!="undefined"){
          localStorage.setItem('bestScore', JSON.stringify(this.bestScore));
        }
      }else{
        this.breakTheScre=false;
      }
    }
  }
  resetThrecored(){
    this.gameService.score$.subscribe(score=>{
      this.bestScore=score;
    })
    if(typeof localStorage!="undefined"){
      localStorage.removeItem('bestScore');
    }
  }

  resetGame() {
    this.cards = this.shuffleCards([...this.generateCards()]);
    this.gameService.moves$.subscribe(moves=>{
      this.moves=moves;
    })
    this.gameService.try$.subscribe(trys=>{
      this.trys=trys
    })
    this.gameService.isOver$.subscribe(isOver=>{
      this.isOver=isOver;
    })
    this.gameService.isRunning$.subscribe(run=>{
      this.isRunning=run;
    })
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.gameService.startRunning();
    this.interval = setInterval(()=>{
      if(this.isRunning){
        this.seconds--;
        const mins=Math.floor((this.seconds % 3600)/60)
        const secs = this.seconds % 60;
        if(mins===0 && secs===0){
          this.gameService.stopRunning()
          
          this.gameService.gameOver();
          this.gameService.active();
        }
        if(mins==0 && secs==30){
          this.isDanger=true;
        }
      }
    },1000)
   
    this.gameService.reset();
    this.breakTheScre=false;
    this.seconds=120;
    this.isDanger=false;
   
    
  }

  shuffleCards(cards: Card[]): Card[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  generateCards(): Card[] {
    const symbols = [
      '1.png', '2.png', '3.png', '4.png', '5.png',
      '6.png', '7.png', '8.png', '9.png', '10.png',
      '11.png', '12.png',
    ];
    return symbols.flatMap(symbol => [
      { id: this.generateId(), symbol, revealed: false ,matched: false},
      { id: this.generateId(), symbol, revealed: false ,matched: false},
    ]);
  }

  generateId(): number {
    return Math.floor(Math.random() * 10000);
  }

}
