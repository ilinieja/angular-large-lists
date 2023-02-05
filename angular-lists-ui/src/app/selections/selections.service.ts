import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Provides temporal in-memory storage for selection.
 */
@Injectable({
  providedIn: 'root',
})
export class SelectionsService {
  usersControl = new FormControl([]);
  countriesControl = new FormControl([]);
  paymentsControl = new FormControl([]);
}
