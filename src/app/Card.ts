import { Type } from "@angular/core";
import { defaultEquals } from "@angular/core/primitives/signals";

export interface Card {
    id: number;       // Un identifiant unique pour la carte
    symbol: string;   // Le contenu de la carte (emoji, image, texte, etc.)
    revealed: boolean; // Indique si la carte est retournée ou non
    matched: boolean; // Indique si la carte a été trouvée
  }
  
  