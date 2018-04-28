import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
    private data: BehaviorSubject<any> = new BehaviorSubject({});

    constructor() { }

    setData(data): void {
        this.data.next(data);
    }

    getData(): Observable<any> {
        return this.data.asObservable();
    }
}
