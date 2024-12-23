import { Component, OnInit, output } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { GameComponent } from "./game/game.component";
import { CommonModule } from '@angular/common';
import { GameService } from './services/game.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MemoryGame';
  isGameRoute: boolean = false;
  moves:number=0;
  trys:number=0

  constructor(private router: Router, private gameService:GameService) {}

  ngOnInit(): void {
    this.gameService.moves$.subscribe(moves =>{
      this.moves = moves;
    })
    this.gameService.try$.subscribe

    this.router.events.subscribe(() => {
      this.isGameRoute = this.router.url === '/game';
    });
  }
}
