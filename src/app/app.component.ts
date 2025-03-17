import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Dostępne nominały banknotów
  nominals = [500, 200, 100, 50, 20, 10];

  // Obiekt trzymający ilość dostępnych banknotów
  banknoty: { [key: number]: number } = {
    10: 0,
    20: 0,
    50: 0,
    100: 0,
    200: 0,
    500: 0,
  };

  // Obiekt do trzymania wyniku wypłaty (ile banknotów wydano)
  wynik: { [key: number]: number } = {};

  // Kwota, którą użytkownik chce wypłacić
  wyplata: number = 0;

  // Flaga, która wskazuje, czy brakuje środków
  brakSrodkow: boolean = false;

  // Funkcja, która realizuje wypłatę
  Wyplac_Pieniadze() {
    // Suma dostępnych pieniędzy
    let sumaDostepna = 0;
    for (let nom of this.nominals) {
      sumaDostepna += this.banknoty[nom] * nom; // Suma = ilość banknotów * ich wartość
    }

    // Sprawdzamy, czy użytkownik chce wypłacić więcej, niż mamy dostępne
    if (this.wyplata > sumaDostepna) {
      this.brakSrodkow = true; // Brak środków
      this.wynik = {}; // Resetujemy wynik
      return;
    }

    this.brakSrodkow = false; // Brak braku środków
    let kwota = this.wyplata; // Kwota, którą trzeba wypłacić
    let nowyWynik: { [key: number]: number } = {}; // Nowy wynik wypłaty

    // Rozdzielamy wypłatę na odpowiednią ilość banknotów
    for (let nom of this.nominals) {
      let iloscBanknotow = Math.min(
        Math.floor(kwota / nom),
        this.banknoty[nom]
      );
      if (iloscBanknotow > 0) {
        nowyWynik[nom] = iloscBanknotow; // Dodajemy do wyniku
        kwota -= iloscBanknotow * nom; // Zmniejszamy pozostałą kwotę do wypłaty
        this.banknoty[nom] -= iloscBanknotow; // Zmniejszamy liczbę dostępnych banknotów
      }
    }

    // Jeśli kwota jest równa 0, wypłata się udała
    if (kwota === 0) {
      this.wynik = nowyWynik;
    } else {
      this.brakSrodkow = true; // Jeśli pozostała jakaś kwota, brak środków
      this.wynik = {}; // Resetujemy wynik
    }
  }
}
