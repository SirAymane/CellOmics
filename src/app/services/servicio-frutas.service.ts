import { Injectable } from '@angular/core';

// This file is a reference, can be used for testing.

@Injectable({
  providedIn: 'root',
})
export class ServicioFrutasService {
  constructor() {}
  
  // Methods that generate/return data
  getFrutas(): string[] {
    let frutas:   string[] = [];
    let auxiliar: string[] = ['manzanas', 'fresas', 'sandias', 'peras'];

    for (let i: number = 0; i < 100; i++) {
      let j = Math.floor(Math.random() * 2);

      frutas.push(auxiliar[j]);
    }

    return frutas;
  }
}
