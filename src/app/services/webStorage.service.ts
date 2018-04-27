import { Injectable } from '@angular/core';

@Injectable()
export class WebStorageService {
  constructor() { }

  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  getItem(item) {
    return localStorage.getItem(item);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
