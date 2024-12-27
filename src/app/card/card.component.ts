import { Component, Input, Output } from '@angular/core';
import { Card } from '../Card';
// import { EventEmitter } from 'stream';
import { CommonModule } from '@angular/common';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card',
  imports: [CommonModule,],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() card!: Card;
  @Input() disableClick:boolean=false; // Reçoit une carte du composant parent
  constructor(private cardServise:CardService){

  }

  onClick() {
    if (!this.card.revealed) {
       this.cardServise.emitCardClicked(this.card);
    }
  }

}
